from flask import Blueprint
from ..models.product import Product
from flask_login import current_user, login_required
from ..models.cart import Cart
# from app.models import User

cart_routes = Blueprint("cart", __name__)

##All Prefixed are in __init__.py
@cart_routes.route("/", methods=["GET"])
@login_required
def get_cart():
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    print("BACKEND ==========>", cart)
    return cart.to_dict()

