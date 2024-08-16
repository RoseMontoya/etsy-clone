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
    cart_items = db.relationship('CartItem', cascade='all, delete-orphan')

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


class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    review = db.Column(db.Text, nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    recommendation = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp(), nullable=False)
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp(), nullable=False)

    product = db.relationship('Product', back_populates='reviews')
    user = db.relationship('User', back_populates='users_reviews')

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "user": self.user.username,
            "review": self.review,
            "stars": self.stars,
            "recommendation": self.recommendation,
            "updated_at": self.updated_at
        }

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
    cart = relationship("Cart", back_populates="user", cascade="all, delete-orphan")
    users_reviews = db.relationship(
        "Review", back_populates="user", cascade="all, delete-orphan"
    )
    favorites = db.relationship(
        "Favorite", back_populates="user", cascade="all, delete-orphan"
    )

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
            "seller_rating": round(
                sum([product.stars_sum() for product in self.products])
                / self.review_count(),
                1,
            )
            if self.review_count() > 0
            else "No Reviews",
            "review_count": self.review_count(),
        }

    def review_count(self):
        return sum([product.review_count() for product in self.products])
