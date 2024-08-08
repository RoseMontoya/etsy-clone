from .db import db, environment, SCHEMA, add_prefix_for_prod

class Favorite(db.Model):
    __tablename__ = "favorites"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    product = db.relationship('Product', back_populates='favorites')
    user = db.relationship('User', back_populates='favorites')

    def todict(__self__):
        return {
            "id": __self__.id,
            "product_id": __self__.product_id,
            "user_id": __self__.user_id,
        }