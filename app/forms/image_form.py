from flask_wtf import FlaskForm
from wtforms import IntegerField, BooleanField, SubmitField
from wtforms.validators import DataRequired, NumberRange
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS


class ProductImageForm(FlaskForm):
    product_id = IntegerField("Product Id", validators=[DataRequired(), NumberRange(min=0)])
    url = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    preview = BooleanField("Preview")
    submit = SubmitField("Submit")
