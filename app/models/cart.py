from .db import db, SCHEMA, environment
# from sqlalchemy.schema import ForeignKey #type: ignore
from sqlalchemy.orm import relationship #type: ignore
print('Database in CART', db)
class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, unique=True)
    
    user = db.relationship('User', back_populates='cart')
    cart_items = db.relationship('CartItem', back_populates='cart', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            "cart_items": [item.to_dict() for item in self.cart_items]
        }

class CartItem(db.Model):
    __tablename__ = 'cart_items'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey("carts.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    gift = db.Column(db.Boolean, default=False)

    cart = db.relationship('Cart', back_populates='cart_items')

    # product = db.relationship('Product')

    # @property
    # def quantity(self):
    #     return self.quantity

    # @quantity.setter
    # def quantity(self, quantity):
    #     self.quantity = quantity


    def to_dict(self):
        return {
            'id': self.id,
            'cart_id': self.cart_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'gift': self.gift,
            # 'product':self.product.to_dict()
        }
