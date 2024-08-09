from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    user1 = User(
        username="JohnDoe",
        email="john.doe@example.com",
        password="password1",
        profile_url="/images/profile1.jpg",
    )
    user2 = User(
        username="JaneSmith",
        email="jane.smith@example.com",
        password="password2",
        profile_url="/images/profile2.jpg",
    )
    user3 = User(
        username="AliceJohnson",
        email="alice.johnson@example.com",
        password="password3",
        profile_url="/images/profile3.jpg",
    )
    user4 = User(
        username="EmilyDavis",
        email="emily.davis@example.com",
        password="password4",
        profile_url="/images/profile4.jpg",
    )
    user5 = User(
        username="SarahWilson",
        email="sarah.wilson@example.com",
        password="password5",
        profile_url="/images/profile5.jpg",
    )
    user6 = User(
        username="RobertBrown",
        email="robert.brown@example.com",
        password="password6",
        profile_url="/images/profile6.jpg",
    )
    user7 = User(
        username="MichaelMiller",
        email="michael.miller@example.com",
        password="password7",
        profile_url="/images/profile7.jpg",
    )
    user8 = User(
        username="LauraAnderson",
        email="laura.anderson@example.com",
        password="password8",
        profile_url="/images/profile8.jpg",
    )

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.add(user6)
    db.session.add(user7)
    db.session.add(user8)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
