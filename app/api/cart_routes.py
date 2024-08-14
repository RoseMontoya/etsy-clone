from flask import Blueprint, jsonify, request
from ..models.product import Product
from flask_login import current_user, login_required
from ..models.cart import Cart, CartItem
from ..models import db
# from app.models import User

cart_routes = Blueprint("cart", __name__)


##All Prefixed are in __init__.py
@cart_routes.route("/", methods=["GET"])
@login_required
def get_cart():
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    print("BACKEND ==========>", cart)
    return cart.to_dict()


@cart_routes.route("/add/", methods=["POST"])
@login_required
def add_to_cart():
    data = request.get_json()
    print("Received data:", data)

    # Extract the necessary information
    product_info = data.get(
        "product_id", {}
    )  # This is actually an object, not just the product ID
    product_id = product_info.get("product_id")
    quantity = product_info.get("quantity", 1)

    # Ensure product_id is valid
    if not product_id:
        return jsonify({"error": "Invalid product ID"}), 400

    # Check if product exists
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    # Find the user's cart
    cart = Cart.query.filter_by(user_id=current_user.id).first()

    # If no cart exists for the user, create one (optional, depending on your use case)
    if not cart:
        cart = Cart(user_id=current_user.id)
        db.session.add(cart)
        db.session.commit()

    # Check if the item is already in the cart
    cart_item = CartItem.query.filter_by(cart_id=cart.id, product_id=product_id).first()

    if cart_item:
        cart_item.quantity += quantity  # Update the quantity if item already in cart
    else:
        cart_item = CartItem(cart_id=cart.id, product_id=product_id, quantity=quantity)
        db.session.add(cart_item)

    db.session.commit()

    return jsonify({"message": "Item added to cart"}), 200


# Delete ALL cart items / Reset Cart
@cart_routes.route("/clear", methods=["DELETE"])
@login_required
def clear_cart():
    cart = Cart.query.filter(Cart.user_id == current_user.id).first()

    if not cart:
        return jsonify({"error": "Cart not found"}), 404

    # Delete all cart items associated with this cart
    CartItem.query.filter_by(cart_id=cart.id).delete()

    db.session.commit()

    return jsonify({"message": "All cart items deleted successfully"}), 200


# Delete a specific item from the cart
@cart_routes.route("/item/<int:cart_item_id>", methods=["DELETE"])
@login_required
def delete_cart_item(cart_item_id):
    cart_item = CartItem.query.get(cart_item_id)

    if not cart_item:
        return jsonify({"error": "Cart item not found"}), 404

    # ensure the cart item belongs to the current user's cart, maybe not needed
    # cart = Cart.query.filter(Cart.user_id == current_user.id).first()
    # if cart_item.cart_id != cart.id:
    #     return jsonify({"error": "Unauthorized action"}), 403

    db.session.delete(cart_item)
    db.session.commit()

    return jsonify({"message": "Cart item deleted successfully"}), 200
