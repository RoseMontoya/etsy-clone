from app.models import db, CartItem, environment, SCHEMA
from sqlalchemy.sql import text

# Adds demo cart
def seed_cartItems():
    item1 = CartItem(
        cart_id=1,
        product_id=20,
        quantity=2,
        gift=False
    )
    item2 = CartItem(
        cart_id=1,
        product_id=13,
        quantity=1,
        gift=True
    )
    item3 = CartItem(
        cart_id=2,
        product_id=11,
        quantity=1,
        gift=False
    )
    
    db.session.add(item1)
    db.session.add(item2)
    db.session.add(item3)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cartItems():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart_items"))
        
    db.session.commit()