from flask import Blueprint, request, jsonify
from ..models.review import Review
from ..models import db
from ..forms import ReviewForm
from flask_login import current_user, login_required
from sqlalchemy import func
# from sqlalchemy.exc import SQLAlchemyError

# Define a blueprint for review-related routes
reviews_routes = Blueprint("reviews", __name__)

# Get review stats for a product
@reviews_routes.route('/review-stats/<int:product_id>')
def get_review(product_id):
    # Query to get the total stars and review count for a specific product
    review = db.session.query(
        Review.product_id,
        func.sum(Review.stars).label("stars_total"),
        func.count(Review.id).label('review_count')
    ).filter(Review.product_id == product_id).group_by(Review.product_id).first()
    
    # If no reviews are found for the product, return zeros
    if not review:
        return {"stars_total": 0,
        "review_count": 0}
    
    # Format the result as a dictionary
    result = {
        "product_id": review.product_id,
        "stars_total": review.stars_total,
        "review_count": review.review_count
    }

    # Return the result as a JSON response
    return jsonify(result)

# Route to edit a review (requires user to be logged in)
@reviews_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def edit_review(review_id):
    # Create a form instance with the data from the request
    updated_form = ReviewForm()
    updated_form['csrf_token'].data = request.cookies['csrf_token']

    # Check if the form data is valid
    if updated_form.validate_on_submit():
        # Query the review to be updated
        review = Review.query.filter(Review.id == review_id).first()

        # Ensure the current user is the owner of the review
        if not current_user.id == review.user_id:
            return {"errors": {"message": "Unauthorized"}}, 401
        
        # Update the review details
        review.review = updated_form.data["review"]
        review.stars = updated_form.data["stars"]
        review.recommendation = updated_form.data["recommendation"]

        # Commit the changes to the database
        db.session.commit()

        # Return the updated review as a dictionary
        return review.to_dict()
    
    # If the form is not valid, return the errors
    return updated_form.errors, 400

# Route to delete a review (user log in required)
@reviews_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    # Query the review to be deleted
    review = Review.query.filter(Review.id == review_id).one()

    # Ensure the current user is the owner of the review
    if not current_user.id == review.user_id:
        return {"errors": {"message": "Unauthorized"}}, 401
    
    # Delete the review and commit the changes
    db.session.delete(review)
    db.session.commit()

    # Return a success message
    return {"message": "Successfully deleted", 'review': review.to_dict()}, 200

# Route to get a summary of all reviews grouped by product
@reviews_routes.route('')
def get_review_summary():
    # Query to get the total stars and review count for all products
    reviews = db.session.query(
        Review.product_id,
        func.sum(Review.stars).label("stars_total"),
        func.count(Review.id).label('review_count')
    ).group_by(Review.product_id).all()

    # print("IN ROTUE FOR REVIEW STATS")
 
    return  [
    {
        "product_id": review.product_id,
        "stars_total": review.stars_total,
        "review_count": review.review_count
    }
    for review in reviews ]
