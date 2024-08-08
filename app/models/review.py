from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False, unique=True)
    review = db.Column(db.Text, nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    recommendation = db.Column(db.Boolean, nullable=False)
    # created_at = db.Column(db.DateTime, default=db.func.current_timestamp(), nullable=False)
    # updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp(), nullable=False)

    product = db.relationship('Product', back_populates='reviews')
    user = db.relationship('User', back_populates='reviews')
    
    @property
    def review(self):
        return self._review
    
    @review.setter
    def review(self, value):
        if not isinstance(value, str):
            raise ValueError("review must be a string")
        self._review = value

    @property
    def stars(self):
        return self._stars

    @stars.setter
    def stars(self, value):
        if not isinstance(value, int) or not (1 <= value <= 5):
            raise ValueError("stars must be an integer between 1 and 5")
        self._stars = value

    @property
    def recommendation(self):
        return self._recommendation

    @recommendation.setter
    def recommendation(self, value):
        if not isinstance(value, bool):
            raise ValueError("recommendation must be a boolean")
        self._recommendation = value

    def todict(__self__):
        return {
            "id": __self__.id,
            "product_id": __self__.product_id,
            "user_id": __self__.user_id,
            "review": __self__.review,
            "stars": __self__.stars,
            "recommendation": __self__.recommendation,
        }