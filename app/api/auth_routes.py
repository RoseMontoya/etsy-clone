from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user
from app.models import User, db, Cart
from app.forms import LoginForm, SignUpForm

# Define a blueprint for auth-related routes
auth_routes = Blueprint("auth", __name__)

# Route to authenticate a user and return their data if authenticated
@auth_routes.route("/")
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {"errors": {"message": "Unauthorized"}}, 401

# Route to log a user in
@auth_routes.route("/login", methods=["POST"])
def login():
    """
    Logs a user in
    """
    form = LoginForm()

    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data["email"]).first()
        login_user(user)
        return user.to_dict()
    return form.errors, 401

# Route to log a user out
@auth_routes.route("/logout")
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {"message": "User logged out"}

# Route to sign up a new user
@auth_routes.route("/signup", methods=["POST"])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_user = User(
            username=form.data["username"],
            email=form.data["email"],
            password=form.data["password"],
            first_name=form.data["first_name"],
            last_name=form.data["last_name"],
        )

        cart = Cart(user=new_user)

        db.session.add(cart)
        db.session.commit()

        login_user(new_user)
        return new_user.to_dict()
    return form.errors, 401

# Route to handle unauthorized access attempts
@auth_routes.route("/unauthorized")
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {"errors": {"message": "Unauthorized"}}, 401
