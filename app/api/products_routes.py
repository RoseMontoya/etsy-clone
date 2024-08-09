from flask import Blueprint
from ..models.product import Product

products_routes = Blueprint("products", __name__)



# Get product by product id
@products_routes.route("/<productId>")
def product_by_id(productId):
    product = Product.query.filter(Product.id == productId).one()
    return product.to_dict()


"""
Query for all products and returns them in a list of product dictionaries
"""
@products_routes.route('/')
def get_all_products():
    products = Product.query.all()
    return [product.to_dict() for product in products]