from flask import Blueprint
from flask_login import login_required
from app.models import User, Product

user_routes = Blueprint("users", __name__)


@user_routes.route("/")
# @login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return [user.to_dict_seller() for user in users]


@user_routes.route("/<int:id>/products")
def get_user_products(id):
    products = Product.query.filter(Product.seller_id == id).all()
    return [product.to_dict() for product in products]


@user_routes.route("/<int:id>")
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict_seller()
