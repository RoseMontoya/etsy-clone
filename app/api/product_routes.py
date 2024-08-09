from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import Product

product_routes = Blueprint('product', __name__)

"""
Query for all products and returns them in a list of product dictionaries
"""
@product_routes.route('/')
def get_all_products():
    products = Product.query.all()
    return [product.to_dict() for product in products]


  
