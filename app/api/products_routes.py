from flask import Blueprint, request, session, jsonify
from ..models import db
from ..models.product import Product, ProductImage
from ..models.review import Review
from ..models.cart import Cart, CartItem
from ..models.user import User
from flask_login import current_user, login_required
from sqlalchemy import func
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import joinedload, subqueryload
from ..forms import ReviewForm, ProductForm, ProductImageForm
import random


products_routes = Blueprint("products", __name__)


# Get all products owned by current user
@products_routes.route("/current", methods=["GET"])
@login_required
def product_manage():
    # Find Products
    products = Product.query.filter(Product.seller_id == current_user.id).all()

    return {
        "products": [product.to_dict() for product in products],
        "user_id": current_user.id,
    }


# Get a random product
@products_routes.route("/random")
def get_random_product():
    # if not current_user.is_anonymous:
    #     count = Product.query.filter(Product.seller_id != current_user.id).count()
    # else:
    count = Product.query.count()
    randomKey = random.randint(1, count)
    product = Product.query.filter(Product.id == randomKey).first()
    return product.to_dict_combined()
    # images = ProductImage.query.filter(ProductImage.product_id == product.id).all()
    # productD["product_images"] = {image.id: image.to_dict() for image in images}
    # return productD


@products_routes.route('/preview-images')
def get_preview_images():
    previewImgs = ProductImage.query.filter(ProductImage.preview == True).all()

    print('IN PREVIEW IMAGE ROUTE')

    return [image.to_dict() for image in previewImgs]


@products_routes.route('/<int:product_id>/images')
def get_product_images(product_id):
    images = ProductImage.query.filter(ProductImage.product_id == product_id).all()
    return jsonify({image.id: image.to_dict() for image in images})


# Get all reviews for a product
@products_routes.route("/<int:productId>/reviews", methods=["GET"])
def product_reviews(productId):
    reviews = Review.query.filter(Review.product_id == productId).all()

    return [review.to_dict() for review in reviews]


# Create a review for product
@products_routes.route("/<int:productId>/reviews", methods=["POST"])
@login_required
def create_review(productId):
    form = ReviewForm()

    form["csrf_token"].data = request.cookies["csrf_token"]
    print("current user", current_user.id)
    prevRev = (
        Review.query.filter(Review.user_id == current_user.id)
        .filter(Review.product_id == productId)
        .first()
    )

    if prevRev:
        return {
            "errors": {"message": "User already has a review for this product."}
        }, 500

    if form.validate_on_submit():
        new_review = Review(
            product_id=form.data["productId"],
            user_id=current_user.id,
            review=form.data["review"],
            stars=form.data["stars"],
            recommendation=form.data["recommendation"],
        )

        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict()
    return form.errors, 400


# Edit product
@products_routes.route("/<int:productId>/edit", methods=["PUT"])
@login_required
def edit_product(productId):
    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        product = Product.query.get(productId)
        if product:
            product.title = form.data["title"]
            product.description = form.data["description"]
            product.inventory = form.data["inventory"]
            product.price = form.data["price"]
            product.category_id = form.data["category_id"]

        db.session.commit()
        return product.to_dict(), 200
    else:
        print("Form errors:", form.errors)
        return form.errors, 400


# Get product by product id
@products_routes.route("/<int:productId>", methods=["GET"])
def product_by_id(productId):
    # Find Product
    try:
        productQ = Product.query.filter(Product.id == productId).one()
        product = productQ.to_dict_combined()
    except SQLAlchemyError as e:
        return {
            "error": {"message": "Product could not be found.", "error": str(e)}
        }, 404

    # Find Product Images and add to product
    # images = ProductImage.query.filter(ProductImage.product_id == productId).all()
    # product["product_images"] = {image.id: image.to_dict() for image in images}

    return product


# Delete product by product id
@products_routes.route("/<int:productId>", methods=["DELETE"])
def delete_product(productId):
    # Find product
    product = Product.query.filter(Product.id == productId).one()

    if product is None:
        return {"error": "Product not found"}, 404

    db.session.delete(product)
    db.session.commit()

    return {"message": "Successfully deleted"}, 200


# Create product
@products_routes.route("/new", methods=["POST"])
@login_required
def create_product():
    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_product = Product(
            title=form.data["title"],
            description=form.data["description"],
            inventory=form.data["inventory"],
            price=form.data["price"],
            seller_id=current_user.id,
            category_id=form.data["category_id"],
        )
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict(), 201
    else:
        print("Form errors:", form.errors)
        return form.errors, 400


# Create Images
@products_routes.route("/images/new", methods=["POST"])
@login_required
def create_images():
    form = ProductImageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_image = ProductImage(
            product_id=form.data["product_id"],
            url=form.data["url"],
            preview=form.data["preview"],
        )
        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict(), 201
    else:
        print("Form errors:", form.errors)
        return form.errors, 400


# Update an existing product image
@products_routes.route("/images/<int:imageId>", methods=["PUT"])
@login_required
def update_product_image(imageId):
    form = ProductImageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        image = ProductImage.query.get(imageId)
        if image:
            image.url = form.data["url"]

            db.session.commit()
            return image.to_dict(), 200
        else:
            return {"error": "Image not found"}, 404
    else:
        print("Form errors:", form.errors)
        return form.errors, 400


@products_routes.route("/images/<int:imageId>", methods=["DELETE"])
@login_required
def delete_image(imageId):
    prevImg = ProductImage.query.get(imageId)

    if prevImg:
        db.session.delete(prevImg)
        db.session.commit()
        return prevImg.to_dict()


# Get all products
@products_routes.route("/", methods=["GET"])
def get_all_products():
    products = Product.query.all()


    return [product.to_dict_x_seller() for product in products]


# Updating inventory list after successful transaction
@products_routes.route("/successful-transaction", methods=["PUT"])
@login_required
def decrease_inventory_edit():
    cart = Cart.query.filter_by(user_id=current_user.id).first()
    cart_items = CartItem.query.filter_by(cart_id=cart.id).all()
    product_ids = [item.product_id for item in cart_items]
    products = Product.query.filter(Product.id.in_(product_ids)).all()

    updated_products = []
    deleted_products = []
    for product in products:
        # Find the matching cart item for the product
        for item in cart_items:
            if product.id == item.product_id:
                # Update the inventory
                if product.inventory - item.quantity > 0:
                    product.inventory -= item.quantity
                    updated_products.append(product.to_dict())
                else:
                    deleted_products.append(product.to_dict())
                    db.session.delete(product)

    db.session.commit()


    # Save changes to the database

    return jsonify(
        {"products": updated_products, "deleted_products": deleted_products}
    ), 200
