from flask import Blueprint
from ..models.review import Review

reviews_routes = Blueprint("reviews", __name__)

@reviews_routes.route('/')
def get_reviews():
    reviews = Review.query.all()
