from sqlalchemy import func
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .review import Review

class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    inventory = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("categories.id")), nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    category = db.relationship("Category", back_populates="products")
    seller = db.relationship("User", back_populates="products")
    images = db.relationship("ProductImage", back_populates="product", cascade="all, delete-orphan")
    reviews = db.relationship('Review', back_populates='product', cascade="all, delete-orphan")
    favorites = db.relationship('Favorite', back_populates='product', cascade='all, delete-orphan')
    cart_items = db.relationship('CartItem', cascade='all, delete-orphan', back_populates="product")

    def to_dict_x_seller(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "inventory": self.inventory,
            "price": self.price,
            "category_id": self.category_id,
            "seller_id": self.seller_id
        }

    def to_dict_combined(self):
       return {"id": self.id,
        "title": self.title,
        "description": self.description,
        "inventory": self.inventory,
        "price": self.price,
        "category_id": self.category_id,
        "seller": self.seller.to_dict()}


    def to_dict(self):
        preview_image_url = None

        preview_image = list(filter(lambda image: image.preview is True, self.images))
        if preview_image:
            preview_image_url = preview_image[0].url

        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "inventory": self.inventory,
            "price": self.price,
            "category_id": self.category_id,
            "seller": self.seller.to_dict_seller(),
            "preview_image": preview_image_url,
        }

    def stars_sum(self):
        sum = Review.query.with_entities(func.sum(Review.stars).label('sum')).filter(Review.product_id == self.id).one()
        return sum[0] or 0

    def review_count(self):
        return len(self.reviews)



class ProductImage(db.Model):
    __tablename__ = "product_images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    url = db.Column(db.Text, nullable=False)
    preview = db.Column(db.Boolean, nullable=False)
    # created_at = db.Column(db.DateTime, server_default=func.now())
    # updated_at = db.Column(db.DateTime, onupdate=func.now())

    product = db.relationship("Product", back_populates="images")

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "url": self.url,
            "preview": self.preview,
            # "created_at": self.created_at,
            # "updated_at": self.updated_at,
        }


class Category(db.Model):
    __tablename__ = "categories"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False)

    products = db.relationship("Product", back_populates="category")


    def to_dict(self):
        return {"id": self.id, "type": self.type}
