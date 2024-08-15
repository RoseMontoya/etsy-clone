from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, SubmitField
from wtforms.validators import DataRequired, NumberRange


class ProductForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[DataRequired()])
    inventory = IntegerField("Inventory", validators=[DataRequired(), NumberRange(min=0)])
    price = IntegerField("Price", validators=[DataRequired(), NumberRange(min=0)])
    category_id = IntegerField("Category", validators=[DataRequired()])
    submit = SubmitField("Submit")