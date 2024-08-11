from flask import Blueprint
from ..models.review import Review

reviews_routes = Blueprint("reviews", __name__)
