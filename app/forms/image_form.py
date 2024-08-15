from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField, BooleanField, SubmitField
from wtforms.validators import DataRequired, NumberRange


class ProductImageForm(FlaskForm):
    product_id = IntegerField("Product Id", validators=[DataRequired(), NumberRange(min=0)])
    url = TextAreaField("Image Url", validators=[DataRequired()])
    preview = BooleanField("Preview")
    submit = SubmitField("Submit")
