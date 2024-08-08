from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

# Adds demo products
def seed_products():
    product1 = Product(
        title="Hand-Painted Fruit Ceramic Coffee Mug",
        description="Enjoy your morning coffee in style with this hand-painted fruit ceramic coffee mug. Each mug features a unique, vibrant fruit design, bringing a touch of freshness and color to your daily routine. Crafted from high-quality ceramic, this mug is both microwave and dishwasher safe, ensuring convenience and durability. Its comfortable handle and generous capacity make it perfect for savoring your favorite hot beverages. Whether for personal use or as a charming gift, this mug adds a delightful, artistic flair to any kitchen.",
        inventory=100,
        price=10,
        category_id=1,
        seller_id=1,
    )
    product2 = Product(
        title="Charming Red Heart Ceramic Mug",
        description="Add a touch of romance to your daily coffee routine with this charming red heart ceramic mug. Featuring a beautifully crafted red heart design, this mug is perfect for expressing love and warmth. Made from high-quality ceramic, it’s microwave and dishwasher safe for easy use and cleaning. With its comfortable handle and ideal capacity, it’s perfect for enjoying your favorite hot beverages. Whether for a special someone or yourself, this mug brings a heartfelt touch to any kitchen.",
        inventory=100,
        price=7,
        category_id=1,
        seller_id=1,
    )
    product3 = Product(
        title="2pcs Set Vintage Ceramic Coffee Mugs",
        description="Elevate your coffee experience with this 2-piece set of vintage ceramic coffee mugs. Each mug features an elegant, classic design that brings a touch of nostalgia and sophistication to your daily routine. Crafted from high-quality ceramic, these mugs are both microwave and dishwasher safe, ensuring ease of use and durability. With their comfortable handles and generous capacity, they are perfect for enjoying your favorite hot beverages with a friend or loved one. Whether for personal use or as a thoughtful gift, this vintage mug set adds a timeless charm to any kitchen.",
        inventory=80,
        price=20,
        category_id=1,
        seller_id=1,
    )
    product4 = Product(
        title="Handcrafted Ceramic Coffee Cup with Floral Design",
        description="Experience elegance with this handcrafted ceramic coffee cup featuring a stunning floral design. Made from high-quality, recyclable ceramic, this cup combines beauty with sustainability. The intricate flower pattern and round shape add a touch of sophistication to your coffee time. Designed for adults, it’s perfect for those who appreciate fine craftsmanship and nature-inspired aesthetics. Please note, for longevity, hand washing is recommended. Enjoy your favorite hot beverages in style with this reusable and eco-friendly coffee cup.",
        inventory=50,
        price=16,
        category_id=1,
        seller_id=1,
    )
    product5 = Product(
        title="Modern Flower Ceramic Cup & Saucer Set",
        description="Elevate your tea or coffee experience with the Modern Flower Ceramic Cup & Saucer Set. Crafted from high-quality ceramic, this set features a stunning floral design that adds a touch of elegance to any table setting. The poly-coated finish ensures durability and a smooth, glossy appearance. Designed as a matching set, it brings a cohesive look to your drinkware collection. For easy maintenance, this set is machine washable, making it perfect for daily use. Enjoy your favorite beverages in style with this charming and practical cup and saucer set.",
        inventory=50,
        price=22,
        category_id=1,
        seller_id=1,
    )
    product6 = Product(
        title="Ceramic Happy Face Bud Vase",
        description="This Ceramic Happy Face Bud Vase features a charming round shape adorned with a whimsical cartoon pattern, perfect for brightening any space. Crafted from high-quality ceramic, it's designed as a bud vase, ideal for displaying small floral arrangements. Its cheerful design adds a playful touch to your decor, making it a delightful addition to any room.",
        inventory=50,
        price=19,
        category_id=1,
        seller_id=1,
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()