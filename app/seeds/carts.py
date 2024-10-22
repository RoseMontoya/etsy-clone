from app.models import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text

# Adds demo cart
def seed_cart():
    cart1 = Cart(user_id=1)
    cart2 = Cart(user_id=2)
    cart3 = Cart(user_id=3)
    cart4 = Cart(user_id=4)
    cart5 = Cart(user_id=5)
    cart6 = Cart(user_id=6)
    cart7 = Cart(user_id=7)
    cart8 = Cart(user_id=8)

    db.session.add(cart1)
    db.session.add(cart2)
    db.session.add(cart3)
    db.session.add(cart4)
    db.session.add(cart5)
    db.session.add(cart6)
    db.session.add(cart7)
    db.session.add(cart8)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cart():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))
        
    db.session.commit()