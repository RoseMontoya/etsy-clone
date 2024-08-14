from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Favorite(db.Model):
    __tablename__ = "favorites"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    product = db.relationship('Product', back_populates='favorites')
    user = db.relationship('User', back_populates='favorites')

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "user_id": self.user_id,
            "product": self.product.to_dict()
        }


