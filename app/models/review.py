from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False
    )
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    review = db.Column(db.Text, nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    recommendation = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(
        db.DateTime, default=db.func.current_timestamp(), nullable=False
    )
    updated_at = db.Column(
        db.DateTime,
        default=db.func.current_timestamp(),
        onupdate=db.func.current_timestamp(),
        nullable=False,
    )

    product = db.relationship("Product", back_populates="reviews")
    user = db.relationship("User", back_populates="users_reviews")

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "user": self.user.username,
            "review": self.review,
            "stars": self.stars,
            "recommendation": self.recommendation,
            "updated_at": self.updated_at,
        }
