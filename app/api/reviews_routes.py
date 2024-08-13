from flask import Blueprint, request
from ..models.review import Review
from ..models import db
from ..forms import ReviewForm
from flask_login import current_user, login_required

reviews_routes = Blueprint("reviews", __name__)

@reviews_routes.route('/<int:review_id>')
@login_required
def edit_review(review_id):
    updated_form = ReviewForm()
    updated_form['csrf_token'].data = request.cookies['csrf_token']

    if updated_form.validate_on_submit():
        review = Review.query.filter(Review.id == review_id).first()
        review.review = updated_form.data["review"],
        review.stars = updated_form.data["stars"],
        review.recommendation = updated_form.data["recommendation"]
        db.session.commit()
        return review.to_dict()

    return updated_form.errors, 400
