from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text

# Adds demo productImages
def seed_productImages():
    image1 = ProductImage(
        product_id=1,
        url="/images/product1_01",
        preview=True
    )
    image2 = ProductImage(
        product_id=1,
        url="/images/product1_02",
        preview=False
    )
    image3 = ProductImage(
        product_id=1,
        url="/images/product1_03",
        preview=False
    )
    image4 = ProductImage(
        product_id=1,
        url="/images/product1_04",
        preview=False
    )
    image5 = ProductImage(
        product_id=1,
        url="/images/product1_05",
        preview=False
    )
    image6 = ProductImage(
        product_id=1,
        url="/images/product1_06",
        preview=False
    )
    image7 = ProductImage(
        product_id=2,
        url="/images/product2_01",
        preview=True
    )
    image8 = ProductImage(
        product_id=2,
        url="/images/product2_02",
        preview=False
    )
    image9 = ProductImage(
        product_id=2,
        url="/images/product2_03",
        preview=False
    )
    image10 = ProductImage(
        product_id=2,
        url="/images/product2_04",
        preview=False
    )
    image11 = ProductImage(
        product_id=2,
        url="/images/product2_05",
        preview=False
    )
    image12 = ProductImage(
        product_id=2,
        url="/images/product2_06",
        preview=False
    )
    image13 = ProductImage(
        product_id=3,
        url="/images/product3_01",
        preview=True
    )
    image14 = ProductImage(
        product_id=3,
        url="/images/product3_02",
        preview=False
    )
    image15 = ProductImage(
        product_id=3,
        url="/images/product3_03",
        preview=False
    )
    image16 = ProductImage(
        product_id=3,
        url="/images/product3_04",
        preview=False
    )
    image17 = ProductImage(
        product_id=3,
        url="/images/product3_05",
        preview=False
    )
    image18 = ProductImage(
        product_id=3,
        url="/images/product3_06",
        preview=False
    )
    image19 = ProductImage(
        product_id=4,
        url="/images/product4_01",
        preview=True
    )
    image20 = ProductImage(
        product_id=4,
        url="/images/product4_02",
        preview=False
    )
    image21 = ProductImage(
        product_id=4,
        url="/images/product4_03",
        preview=False
    )
    image22 = ProductImage(
        product_id=4,
        url="/images/product4_04",
        preview=False
    )
    image23 = ProductImage(
        product_id=4,
        url="/images/product4_05",
        preview=False
    )
    image24 = ProductImage(
        product_id=4,
        url="/images/product5_06",
        preview=False
    )
    image25 = ProductImage(
        product_id=5,
        url="/images/product6_01",
        preview=True
    )
    image26 = ProductImage(
        product_id=5,
        url="/images/product6_02",
        preview=False
    )
    image27 = ProductImage(
        product_id=5,
        url="/images/product6_03",
        preview=False
    )
    image28 = ProductImage(
        product_id=5,
        url="/images/product6_04",
        preview=False
    )
    image29 = ProductImage(
        product_id=5,
        url="/images/product6_05",
        preview=False
    )
    image30 = ProductImage(
        product_id=5,
        url="/images/product6_06",
        preview=False
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)
    db.session.add(image11)
    db.session.add(image12)
    db.session.add(image13)
    db.session.add(image14)
    db.session.add(image15)
    db.session.add(image16)
    db.session.add(image17)
    db.session.add(image18)
    db.session.add(image19)
    db.session.add(image20)
    db.session.add(image21)
    db.session.add(image22)
    db.session.add(image23)
    db.session.add(image24)
    db.session.add(image25)
    db.session.add(image26)
    db.session.add(image27)
    db.session.add(image28)
    db.session.add(image29)
    db.session.add(image30)

   
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_productImages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))
        
    db.session.commit()