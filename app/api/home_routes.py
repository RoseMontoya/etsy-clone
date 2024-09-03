from flask import Blueprint
from ..models.product import Product
from flask_login import current_user

home_routes = Blueprint("home", __name__)


##All Prefixed are in __init__.py
@home_routes.route("/")
def get_home_page():
    products = Product.query.all()
    if current_user.is_authenticated:
        user = current_user  # current_user from flask_login
        user_info = user.to_dict()
        return {
            "user": user_info,
            "products": [product.to_dict() for product in products],
        }
    else:
        return {"products": [product.to_dict() for product in products]}
