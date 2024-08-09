from flask.cli import AppGroup
from .users import seed_users, undo_users
from .products import seed_products, undo_products
from .productimages import seed_productImages, undo_productImages
from .categories import seed_categories, undo_categories
from .reviews import seed_reviews, undo_reviews
from .cartitems import seed_cartItems, undo_cartItems
from .carts import seed_cart, undo_cart
from .favorites import seed_favorite, undo_favorite

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_cartItems()
        undo_cart()
        undo_favorite()
        undo_reviews()
        undo_productImages()
        undo_products()
        undo_categories()
        undo_users()
    seed_users()
    seed_categories()
    seed_products()
    seed_productImages()
    seed_reviews()
    seed_favorite()
    seed_cart()
    seed_cartItems()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_cartItems()
    undo_cart()
    undo_favorite()
    undo_reviews()
    undo_productImages()
    undo_products()
    undo_categories()
    undo_users()
    # Add other undo functions here
