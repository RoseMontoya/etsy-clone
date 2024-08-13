from flask import Blueprint, request, jsonify
from ..models.product import Product, ProductImage
from ..models.review import Review
from ..models.user import User
from ..models import db
from ..forms import ProductForm
from flask_login import current_user, login_required
from sqlalchemy.exc import SQLAlchemyError

products_routes = Blueprint("products", __name__)

# Get all products owned by current user
@products_routes.route('/current', methods=["GET"])
@login_required
def product_manage():
    # Find Products
    products = Product.query.filter(Product.seller_id == current_user.id).all()
    
    return [ product.to_dict() for product in products ]


# Get all reviews for a product
@products_routes.route('/<int:productId>/reviews', methods=["GET"])
def product_reviews(productId):
    reviews = Review.query.filter(Review.product_id == productId).all()

    return [ review.to_dicts() for review in reviews ]


# Get product by product id
@products_routes.route("/<int:productId>", methods=["GET"])
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
@products_routes.route('/', methods=["POST"])
def create_product():
    print("hELLO?")
    form = ProductForm();
    # form['csrf_token'].data = request.cookies['csrf_token'];
    if form.validate_on_submit():
        new_product = Product(
            title=form.data['title'],
            description=form.data['description'],
            inventory=form.data['inventory'],
            price=form.data['price'],
            seller_id=current_user.id,
            category_id=form.data['category_id'],
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify({"message": "Product created successfully", "product": new_product.to_dict()}), 201
    return jsonify({"errors": form.errors}), 400


# Get all products
@products_routes.route('/', methods=["GET"])
def get_all_products():
    products = Product.query.all()
    # [product.avg_rating() for product in products]
    return [product.to_dict() for product in products]
