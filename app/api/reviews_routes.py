from flask import Blueprint, request, jsonify
from ..models.review import Review
from ..models import db
from ..forms import ReviewForm
from flask_login import current_user, login_required
from sqlalchemy import func


reviews_routes = Blueprint("reviews", __name__)

# get review stats for a product
@reviews_routes.route('/review-stats/<int:product_id>')
def get_review(product_id):
    review = db.session.query(
        Review.product_id,
        func.sum(Review.stars).label("stars_total"),
        func.count(Review.id).label('review_count')
    ).filter(Review.product_id == product_id).one()

    return {
        "product_id": review.product_id,
        "stars_total": review.stars_total,
        "review_count": review.review_count
    }


@reviews_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def edit_review(review_id):
    updated_form = ReviewForm()
    updated_form['csrf_token'].data = request.cookies['csrf_token']

    if updated_form.validate_on_submit():
        review = Review.query.filter(Review.id == review_id).first()

        if not current_user.id == review.user_id:
            return {"errors": {"message": "Unauthorized"}}, 401

        review.review = updated_form.data["review"]
        review.stars = updated_form.data["stars"]
        review.recommendation = updated_form.data["recommendation"]
        db.session.commit()
        return review.to_dict()

    return updated_form.errors, 400

@reviews_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.filter(Review.id == review_id).one()

    if not current_user.id == review.user_id:
        return {"errors": {"message": "Unauthorized"}}, 401

    db.session.delete(review)
    db.session.commit()
    return {"message": "Successfully deleted", 'review': review.to_dict()}, 200

@reviews_routes.route('')
def get_review_summary():
    reviews = db.session.query(
        Review.product_id,
        func.sum(Review.stars).label("stars_total"),
        func.count(Review.id).label('review_count')
    ).group_by(Review.product_id).all()

    print("IN ROTUE FOR REVIEW STATS")

    return  [
    {
        "product_id": review.product_id,
        "stars_total": review.stars_total,
        "review_count": review.review_count
    }
    for review in reviews ]
