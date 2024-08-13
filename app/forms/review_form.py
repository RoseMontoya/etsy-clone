from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField, BooleanField, SubmitField
from wtforms.validators import DataRequired, ValidationError

class ReviewForm(FlaskForm):
    productId = IntegerField("Product Id", validators=[DataRequired()])
    review = TextAreaField("Review", validators=[DataRequired()])
    stars = IntegerField("Stars", validators=[DataRequired()])
    recommendation = BooleanField("Recommend?")
    submit = SubmitField("Submit")
