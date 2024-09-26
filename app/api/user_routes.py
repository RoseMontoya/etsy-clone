from flask import Blueprint
from flask_login import login_required
from app.models import User, Product

# Defining blueprint for user-related routes
user_routes = Blueprint('users', __name__)

# Get all users
@user_routes.route('/')
# @login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    # print('IN USER ROUTE ~~~~~~~~~~~~~~~')

    # Query all users from the database
    users = User.query.all()

    # Return a list of user dictionaries using the `to_dict_seller` method for each user
    return [user.to_dict_seller() for user in users]

# Get all products of a user
@user_routes.route('/<int:id>/products')
def get_user_products(id):
    """
    Query for all products associated with a specific user (seller)
    and return them in a list of product dictionaries.
    """

    # Query all products where the seller_id matches the provided user id
    products = Product.query.filter(Product.seller_id == id).all()
    print('PRODUCTS', products)

    # Return a list of product dictionaries using the `to_dict` method for each product
    return [product.to_dict() for product in products]


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary.
    Requires the user to be logged in.
    """

    # Query the user with the specified id
    user = User.query.get(id)

    # Return the user as a dictionary using the `to_dict_seller` method
    return user.to_dict_seller()
