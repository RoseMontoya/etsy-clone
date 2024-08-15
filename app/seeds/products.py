from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

# Adds demo products
def seed_products():
    product1 = Product(
        title="Hand-Painted Fruit Ceramic Coffee Mug",
        description="Enjoy your morning coffee in style with this hand-painted fruit ceramic coffee mug. Each mug features a unique, vibrant fruit design, bringing a touch of freshness and color to your daily routine. Crafted from high-quality ceramic, this mug is both microwave and dishwasher safe, ensuring convenience and durability. Its comfortable handle and generous capacity make it perfect for savoring your favorite hot beverages. Whether for personal use or as a charming gift, this mug adds a delightful, artistic flair to any kitchen.",
        inventory=10,
        price=10,
        category_id=1,
        seller_id=1,
    )
    product2 = Product(
        title="Charming Red Heart Ceramic Mug",
        description="Add a touch of romance to your daily coffee routine with this charming red heart ceramic mug. Featuring a beautifully crafted red heart design, this mug is perfect for expressing love and warmth. Made from high-quality ceramic, it’s microwave and dishwasher safe for easy use and cleaning. With its comfortable handle and ideal capacity, it’s perfect for enjoying your favorite hot beverages. Whether for a special someone or yourself, this mug brings a heartfelt touch to any kitchen.",
        inventory=20,
        price=7,
        category_id=1,
        seller_id=1,
    )
    product3 = Product(
        title="2pcs Set Vintage Ceramic Coffee Mugs",
        description="Elevate your coffee experience with this 2-piece set of vintage ceramic coffee mugs. Each mug features an elegant, classic design that brings a touch of nostalgia and sophistication to your daily routine. Crafted from high-quality ceramic, these mugs are both microwave and dishwasher safe, ensuring ease of use and durability. With their comfortable handles and generous capacity, they are perfect for enjoying your favorite hot beverages with a friend or loved one. Whether for personal use or as a thoughtful gift, this vintage mug set adds a timeless charm to any kitchen.",
        inventory=15,
        price=20,
        category_id=1,
        seller_id=1,
    )
    product4 = Product(
        title="Handcrafted Ceramic Coffee Cup with Floral Design",
        description="Experience elegance with this handcrafted ceramic coffee cup featuring a stunning floral design. Made from high-quality, recyclable ceramic, this cup combines beauty with sustainability. The intricate flower pattern and round shape add a touch of sophistication to your coffee time. Designed for adults, it’s perfect for those who appreciate fine craftsmanship and nature-inspired aesthetics. Please note, for longevity, hand washing is recommended. Enjoy your favorite hot beverages in style with this reusable and eco-friendly coffee cup.",
        inventory=15,
        price=16,
        category_id=1,
        seller_id=1,
    )
    product5 = Product(
        title="Modern Flower Ceramic Cup & Saucer Set",
        description="Elevate your tea or coffee experience with the Modern Flower Ceramic Cup & Saucer Set. Crafted from high-quality ceramic, this set features a stunning floral design that adds a touch of elegance to any table setting. The poly-coated finish ensures durability and a smooth, glossy appearance. Designed as a matching set, it brings a cohesive look to your drinkware collection. For easy maintenance, this set is machine washable, making it perfect for daily use. Enjoy your favorite beverages in style with this charming and practical cup and saucer set.",
        inventory=20,
        price=22,
        category_id=1,
        seller_id=1,
    )
    product6 = Product(
        title="Ceramic Happy Face Bud Vase",
        description="This Ceramic Happy Face Bud Vase features a charming round shape adorned with a whimsical cartoon pattern, perfect for brightening any space. Crafted from high-quality ceramic, it's designed as a bud vase, ideal for displaying small floral arrangements. Its cheerful design adds a playful touch to your decor, making it a delightful addition to any room.",
        inventory=50,
        price=25,
        category_id=1,
        seller_id=2,
    )
    product7 = Product(
        title="Cat-Shaped Resin Vase",
        description="This Cat-Shaped Resin Vase offers a playful yet sophisticated touch to any space. With its oblong shape and geometric pattern, it blends seamlessly into casual decor. Crafted from durable resin, this vase is both stylish and functional, perfect for showcasing flowers or standing alone as a statement piece.",
        inventory=30,
        price=25,
        category_id=1,
        seller_id=2,
    )
    product8 = Product(
        title="Exquisite Art Deco Round Glass Vase",
        description="This Exquisite Art Deco Round Glass Vase features a timeless design that exudes elegance. Made from high-quality glass, its round shape and intricate detailing make it a stunning centerpiece. Perfect for adding a touch of vintage charm to your decor, it effortlessly enhances any floral arrangement.",
        inventory=10,
        price=25,
        category_id=1,
        seller_id=2,
    )
    product9 = Product(
        title="Modern Geometric Donut-Shaped Vase",
        description="The Modern Geometric Donut-Shaped Vase combines contemporary style with unique design. Its donut shape and sleek geometric lines create a striking visual effect. Crafted from premium materials, this vase is ideal for minimalist or modern interiors, adding an artistic flair to any room.",
        inventory=5,
        price=25,
        category_id=1,
        seller_id=2,
    )
    product10 = Product(
        title="3pcs White Ceramic Vase Set",
        description="This 3pcs White Ceramic Vase Set offers versatility and elegance with its minimalist design. Each vase features a smooth, matte finish and varying sizes, perfect for creating a cohesive display. Ideal for showcasing small bouquets or as standalone decor, this set adds a touch of modern sophistication to any space.",
        inventory=20,
        price=25,
        category_id=1,
        seller_id=2,
    )
    product11 = Product(
        title="12pcs Delicate Succulent Cactus Tealight Candles",
        description="Bring a touch of nature indoors with these 12pcs Delicate Succulent Cactus Tealight Candles. Each candle is intricately designed to resemble a miniature succulent or cactus, adding a playful and charming vibe to any space. Perfect for home decor, parties, or gifts, these tealights offer a unique blend of style and function.",
        inventory=30,
        price=20,
        category_id=1,
        seller_id=3,
    )
    product12 = Product(
        title="10pcs Handmade Scented Flower Candles",
        description="Elevate your ambiance with these 10pcs Handmade Scented Flower Candles. Crafted with care, each candle is shaped like a delicate flower, infused with a soothing fragrance that fills the room. Ideal for romantic evenings, special occasions, or as a thoughtful gift, these candles add a touch of elegance and tranquility to any setting.",
        inventory=5,
        price=25,
        category_id=1,
        seller_id=3,
    )
    product13 = Product(
        title="Heart-Shaped Candles",
        description="Add a touch of romance to your space with these Heart-Shaped Candles. Perfect for setting a romantic mood or celebrating special occasions, these candles are designed in the shape of hearts and emit a soft, warm glow. Whether for a wedding, anniversary, or just to show someone you care, these candles are a heartfelt choice.",
        inventory=9,
        price=19,
        category_id=1,
        seller_id=3,
    )
    product14 = Product(
        title="Handmade Ice Cream Shaped Candles",
        description="These Handmade Ice Cream Shaped Candles are a delightful treat for the senses. With their realistic design and vibrant colors, they add a fun and whimsical touch to any decor. Perfect for parties, gifts, or simply brightening up a room, these candles are sure to be a sweet addition to your home.",
        inventory=16,
        price=15,
        category_id=1,
        seller_id=3,
    )
    product15 = Product(
        title="Halloween Ghost and Pumpkin Shaped Candle Set",
        description="Get into the spooky spirit with this Halloween Ghost and Pumpkin Shaped Candle Set. Each candle is intricately designed to resemble a ghost or pumpkin, making them the perfect addition to your Halloween decor. Ideal for parties or adding a festive touch to your home, these candles are both fun and functional.",
        inventory=20,
        price=20,
        category_id=1,
        seller_id=3,
    )
    product16 = Product(
        title="Battery-Powered DIY Miniature House Puzzle",
        description="Unleash your creativity with this Battery-Powered DIY Miniature House Puzzle. This detailed kit allows you to build your own miniature house, complete with realistic furniture and decor. Battery-powered lights add a warm glow, bringing your creation to life. Perfect for hobbyists, this puzzle offers hours of fun and a beautiful keepsake.",
        inventory=8,
        price=30,
        category_id=3,
        seller_id=4,
    )
    product17 = Product(
        title="Charming DIY Miniature Garden House",
        description="Create your own little paradise with this Charming DIY Miniature Garden House. This kit includes everything you need to build a cozy garden house complete with tiny plants and detailed furniture. Perfect for hobbyists and collectors, it’s a relaxing project that results in a charming display piece.",
        inventory=6,
        price=29,
        category_id=3,
        seller_id=4,
    )
    product18 = Product(
        title="Wooden DIY Assembly Small House",
        description="Bring your dream house to life with this Wooden DIY Assembly Small House. This kit features pre-cut wooden pieces that you can easily assemble into a beautiful miniature home. With realistic details and endless customization options, it’s a fun and rewarding project for DIY enthusiasts.",
        inventory=5,
        price=25,
        category_id=3,
        seller_id=4,
    )
    product19 = Product(
        title="Wooden Flower Bouquet DIY 3D Puzzle",
        description="The Wooden Flower Bouquet DIY 3D Puzzle is a unique and creative way to craft your own floral arrangement. This puzzle features intricately cut wooden pieces that assemble into a beautiful bouquet, perfect for display. It’s a delightful gift for puzzle lovers and a beautiful addition to any room.",
        inventory=12,
        price=20,
        category_id=3,
        seller_id=4,
    )
    product20 = Product(
        title="Eternal Flower Creative Puzzle Assembly Building Blocks",
        description="Express your creativity with the Eternal Flower Creative Puzzle Assembly Building Blocks. This innovative set allows you to build beautiful flower arrangements using interlocking blocks. The vibrant colors and intricate designs make it a perfect decorative piece and a fun project for all ages.",
        inventory=8,
        price=21,
        category_id=3,
        seller_id=4,
    )
    product21 = Product(
        title="Handmade Crochet Tulip Keychain",
        description="Carry a touch of spring with you wherever you go with this Handmade Crochet Tulip Keychain. Each keychain is carefully crafted with soft yarn, creating a delicate and charming tulip. It’s a perfect accessory for your keys or bag, adding a bit of handmade love to your everyday essentials.",
        inventory=12,
        price=7,
        category_id=2,
        seller_id=5,
    )
    product22 = Product(
        title="Colorful Beaded Phone Chain",
        description="Brighten up your phone with this Colorful Beaded Phone Chain. Featuring a vibrant mix of beads, this chain is both stylish and functional, making it easy to hold your phone while adding a pop of color. Perfect as a gift or a fun accessory for yourself.",
        inventory=15,
        price=6,
        category_id=2,
        seller_id=5,
    )
    product23 = Product(
        title="Pearl Keychain",
        description="Add a touch of elegance to your keys with this Pearl Keychain. The lustrous pearls are strung together to create a chic and sophisticated accessory. Perfect for everyday use or as a thoughtful gift, this keychain combines functionality with timeless style.",
        inventory=20,
        price=9,
        category_id=2,
        seller_id=5,
    )
    product24 = Product(
        title="Keychain with House, Flower & Mushroom Designs",
        description="This Keychain with House, Flower & Mushroom Designs is a whimsical accessory that brings a bit of nature and homey charm to your keys. Each piece is detailed and colorful, making it a fun and unique addition to your collection. Perfect for anyone who loves quirky and creative designs.",
        inventory=10,
        price=9,
        category_id=2,
        seller_id=5,
    )
    product25 = Product(
        title="Bohemian Floral Pattern Crochet Dress",
        description="Embrace effortless style with this Bohemian Floral Crochet Dress, perfect for spring and summer getaways. This sleeveless, loose-fitting dress combines intricate crochet patterns with vibrant floral designs, offering a breezy, relaxed fit. Ideal for beach vacations or casual outings, this dress is a must-have addition to your wardrobe, blending comfort and boho-chic elegance effortlessly.",
        inventory=10,
        price=50,
        category_id=5,
        seller_id=6,
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)
    db.session.add(product11)
    db.session.add(product12)
    db.session.add(product13)
    db.session.add(product14)
    db.session.add(product15)
    db.session.add(product16)
    db.session.add(product17)
    db.session.add(product18)
    db.session.add(product19)
    db.session.add(product20)
    db.session.add(product21)
    db.session.add(product22)
    db.session.add(product23)
    db.session.add(product24)
    db.session.add(product25)



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