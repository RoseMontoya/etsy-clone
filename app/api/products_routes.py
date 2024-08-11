from flask import Blueprint
from ..models.product import Product
from ..models.review import Review
from sqlalchemy.sql import func

products_routes = Blueprint("products", __name__)

# Get all reviews for a product
@products_routes.route('/<int:productId>/reviews')
def product_reviews(productId):
    reviews = Review.query.filter(Review.product_id == productId).all()
    return [ review.to_dict() for review in reviews ]


# Get product by product id
@products_routes.route("/<int:productId>")
def product_by_id(productId):
    product = Product.query.filter(Product.id == productId).one()
    prod = product.to_dict()
    prod['edited'] = True
    return prod


"""
Query for all products and returns them in a list of product dictionaries
"""
@products_routes.route('/')
def get_all_products():
    products = Product.query.all()
    # [product.avg_rating() for product in products]
    return [product.to_dict() for product in products]
