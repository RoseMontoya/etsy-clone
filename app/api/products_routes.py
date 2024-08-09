from flask import Blueprint
from ..models.product import Product

products_routes = Blueprint("products", __name__)

# Get product by product id
@products_routes.route("/<productId>")
def product_by_id(productId):
    # print(productId)
    # print("INSIDE PROD REVIEWS PAGE")
    # print(isinstance(productId, str))
    product = Product.query.filter(Product.id == productId).one()
    print("----------------")
    print(product.to_dict())
    print("----------------")
    # print(isinstance(product.to_dict()["id"], str))
    return product.to_dict()