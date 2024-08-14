from flask import Blueprint, request, session
from ..models import db
from ..models.favorite import Favorite
from flask_login import current_user, login_required
from sqlalchemy.exc import SQLAlchemyError
from ..forms import ReviewForm, ProductForm, ProductImageForm

favorites_routes = Blueprint("favorites", __name__)

@favorites_routes.route("/current")
@login_required
def get_favorites():
    favorites = Favorite.query.filter(Favorite.user_id == current_user.id).all()

    return [favorite.to_dict() for favorite in favorites]

@favorites_routes.route("/", methods=['POST'])
@login_required
def add_favorites():
    productId = request.get_json()
    preFavs = Favorite.query.filter(Favorite.product_id == productId).filter(Favorite.user_id == current_user.id).first()

    if not preFavs: 
        new_favorite = Favorite(
        product_id=productId,
        user_id=current_user.id
        )
        db.session.add(new_favorite)
        db.session.commit()
        return new_favorite.to_dict()
    return { "errors": {"message": "User already favorited this product."}}, 500 
