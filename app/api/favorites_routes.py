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

