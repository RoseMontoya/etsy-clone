from flask import Blueprint, request
from ..models import db
from ..models.product import Product, ProductImage
from ..models.review import Review
from sqlalchemy.exc import SQLAlchemyError
from ..forms import ReviewForm
from flask_login import login_required, current_user

products_routes = Blueprint("products", __name__)

# Get all reviews for a product
@products_routes.route('/<int:productId>/reviews')
def product_reviews(productId):
    reviews = Review.query.filter(Review.product_id == productId).all()

    return [ review.to_dict() for review in reviews ]

# Create a review for product
@products_routes.route('/<int:productId>/reviews', methods=['POST'])
@login_required
def create_review(productId):
    form = ReviewForm()
    # print("FORM ===============================>", form.data)
    form['csrf_token'].data = request.cookies['csrf_token']

    user = Review.query.filter(Review.user_id == current_user.id).first()
    if user:
        return {"message": "User already has a review for this product."}, 500

    if form.validate_on_submit():
        new_review = Review(
            product_id = form.data["productId"],
            user_id = current_user.id,
            review = form.data["review"],
            stars = form.data["stars"],
            recommendation = form.data["recommendation"]
        )

        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict()
    return form.errors, 400

# Get product by product id
@products_routes.route("/<int:productId>")
def product_by_id(productId):

    # Find Product
    try:
        productQ = Product.query.filter(Product.id == productId).one()
        product = productQ.to_dict()
    except SQLAlchemyError as e:
        return {'error': { 'message':'Product could not be found.', 'error': str(e)}}, 404

    # Find Product Images and add to product
    images = ProductImage.query.filter(ProductImage.product_id == productId).all()
    product['product_images'] = [image.to_dict() for image in images]

    return product


"""
Query for all products and returns them in a list of product dictionaries
"""
@products_routes.route('/')
def get_all_products():
    products = Product.query.all()
    # [product.avg_rating() for product in products]
    return [product.to_dict() for product in products]
