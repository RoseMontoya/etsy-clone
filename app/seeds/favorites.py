from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text

# Adds demo favorite
def seed_favorite():
    favorite1 = Favorite(
        product_id=8,
        user_id=1
    )
    favorite2 = Favorite(
        product_id=9,
        user_id=1
    )
    favorite3 = Favorite(
        product_id=12,
        user_id=1
    )
    favorite4 = Favorite(
        product_id=24,
        user_id=2
    )
    
    db.session.add(favorite1)
    db.session.add(favorite2)
    db.session.add(favorite3)
    db.session.add(favorite4)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_favorite():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))
        
    db.session.commit()