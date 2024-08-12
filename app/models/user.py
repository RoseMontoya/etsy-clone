from .db import db, environment, SCHEMA
from .review import Review
from .product import Product
# add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship #type: ignore
from sqlalchemy.sql import func

class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_url = db.Column(
        db.String(255),
        default="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    )
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    products = db.relationship("Product", back_populates="seller")
    cart = relationship('Cart', back_populates='user', cascade='all, delete-orphan')
    users_reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')
    favorites = db.relationship('Favorite', back_populates='user', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict_seller(self):
        return {
            "id": self.id,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "profile_url": self.profile_url,
            "seller_rating": round(sum([product.stars_sum() for product in self.products]) / self.review_count(), 1) if self.review_count() > 0 else 'No Reviews',
            "review_count": self.review_count()
        }

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "username": self.username,
            "email": self.email,
            "profile_url": self.profile_url,
            # "avg_rating": round(sum([product.stars_sum() for product in self.products]) / self.review_count(), 1),
            # "review_count": self.review_count()
        }
    def review_count(self):
        return sum([product.review_count() for product in self.products])
