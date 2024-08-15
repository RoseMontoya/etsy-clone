from flask import Blueprint, request
from ..models.review import Review
from ..models import db
from ..forms import ReviewForm
from flask_login import current_user, login_required

reviews_routes = Blueprint("reviews", __name__)

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
    return {"message": "Successfully deleted"}, 200
