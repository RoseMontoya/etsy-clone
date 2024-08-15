from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

# Adds demo reviews
def seed_reviews():
    review1 = Review(
        product_id=1,
        user_id=2,
        review="This mug is simply beautiful! The hand-painted fruit design is so cheerful, and it’s the perfect size for my morning coffee.",
        stars=5,
        recommendation=True,
    )
    review2 = Review(
        product_id=1,
        user_id=3,
        review="I love the quality of this mug. It feels sturdy, and the paint job is impeccable. It brightens up my mornings!",
        stars=4,
        recommendation=True,
    )
    review3 = Review(
        product_id=1,
        user_id=4,
        review="I bought this as a gift, and it was a huge hit. The vibrant fruit design is so unique and adds a personal touch.",
        stars=5,
        recommendation=True,
    )
    review4 = Review(
        product_id=2,
        user_id=4,
        review="This mug is adorable! The red heart design is perfect for a cozy morning coffee. It's sturdy and well-made, quickly becoming my go-to mug.",
        stars=4,
        recommendation=True,
    )
    review5 = Review(
        product_id=2,
        user_id=5,
        review="I bought this for my wife, and she loves it. The heart design is charming, and it holds a good amount of coffee. Great purchase!",
        stars=5,
        recommendation=True,
    )
    review6 = Review(
        product_id=3,
        user_id=5,
        review="These mugs are stunning! The vintage design is beautiful, and they feel very sturdy. Perfect for my morning coffee.",
        stars=5,
        recommendation=True,
    )
    review7 = Review(
        product_id=3,
        user_id=6,
        review="These mugs are lovely, but they seem a bit smaller than I expected.",
        stars=2,
        recommendation=False,
    )
    review8 = Review(
        product_id=4,
        user_id=6,
        review="I love the craftsmanship of this cup. It feels sturdy, and the hand-painted flowers are exquisite. Worth every penny!",
        stars=5,
        recommendation=True,
    )
    review9 = Review(
        product_id=4,
        user_id=7,
        review="The design is lovely, but it’s a bit small for my liking. However, it’s perfect for a quick coffee break and looks great on my shelf.",
        stars=4,
        recommendation=True,
    )
    review10 = Review(
        product_id=4,
        user_id=8,
        review="The floral design is charming and adds a touch of elegance to my mornings. It's well-made, but the hand wash only instruction is a bit of a hassle.",
        stars=4,
        recommendation=True,
    )
    review11 = Review(
        product_id=6,
        user_id=1,
        review="I absolutely love the Ceramic Happy Face Bud Vase! It’s the perfect size for my small floral arrangements, and the cheerful design never fails to brighten my day.",
        stars=4,
        recommendation=True,
    )
    review12 = Review(
        product_id=6,
        user_id=7,
        review="While the Ceramic Happy Face Bud Vase is cute, I was disappointed with its size. It’s much smaller than I expected, and it doesn't hold as many flowers as I’d like.",
        stars=2,
        recommendation=False,
    )
    review13 = Review(
        product_id=7,
        user_id=1,
        review="This vase is both stylish and fun! It adds a unique touch to my decor, and the quality is great.",
        stars=5,
        recommendation=True,
    )
    review14 = Review(
        product_id=7,
        user_id=4,
        review="I love the playful design of this vase. It’s perfect for small floral arrangements, and it really stands out in my home.",
        stars=4,
        recommendation=True,
    )
    review15 = Review(
        product_id=7,
        user_id=7,
        review="This vase is adorable! It adds a cheerful touch to my living room, and the quality of the ceramic is excellent.",
        stars=4,
        recommendation=True,
    )
    review16 = Review(
        product_id=8,
        user_id=5,
        review="This vase is stunning! The Art Deco design adds a touch of elegance to my decor. It’s a true centerpiece.",
        stars=5,
        recommendation=True,
    )
    review17 = Review(
        product_id=7,
        user_id=6,
        review="The vase looks elegant, but it’s quite delicate. I’m afraid it might break easily.",
        stars=2,
        recommendation=False,
    )
    review18 = Review(
        product_id=9,
        user_id=7,
        review="The vase looks elegant, but it’s quite delicate. I’m afraid it might break easily.",
        stars=5,
        recommendation=True,
    )
    review19 = Review(
        product_id=10,
        user_id=8,
        review="This vase set is perfect for minimalist decor. The matte finish is beautiful, and they look great as a trio or individually. The sizes are perfect for small arrangements, and the quality is excellent.",
        stars=4,
        recommendation=True,
    )
    review20 = Review(
        product_id=11,
        user_id=1,
        review="These tealights are adorable! They look just like tiny succulents and add a charming touch to my decor.",
        stars=5,
        recommendation=True,
    )
    review21 = Review(
        product_id=11,
        user_id=2,
        review="Perfect for parties or gifts. The design is so cute, and they burn evenly. Love them!",
        stars=4,
        recommendation=True,
    )
    review22 = Review(
        product_id=12,
        user_id=8,
        review="These candles are beautiful and smell amazing! The floral design is so delicate, perfect for special occasions.",
        stars=5,
        recommendation=True,
    )
    review23 = Review(
        product_id=13,
        user_id=1,
        review="The candles are nice, but they’re smaller than I thought. They burn quickly, so they don’t last long.",
        stars=2,
        recommendation=False,
    )
    review24 = Review(
        product_id=14,
        user_id=5,
        review="These ice cream candles are adorable! They’re perfect for parties or as a fun gift. My kids love them!",
        stars=5,
        recommendation=True,
    )
    review25 = Review(
        product_id=14,
        user_id=6,
        review="Such a cute and whimsical design. The candles add a playful touch to any room, and they’re well made.",
        stars=5,
        recommendation=True,
    )
    review26 = Review(
        product_id=15,
        user_id=1,
        review="The candles are cute, but they’re more for decoration. They don’t last very long when lit.",
        stars=2,
        recommendation=False,
    )
    review27 = Review(
        product_id=16,
        user_id=1,
        review="This DIY puzzle is so much fun! The details are incredible, and the battery-powered lights add a magical touch. The finished house looks amazing on display.",
        stars=5,
        recommendation=True,
    )
    review28 = Review(
        product_id=16,
        user_id=2,
        review="The puzzle is nice, but it’s very delicate and took longer to assemble than I expected. Not for beginners.",
        stars=3,
        recommendation=False,
    )
    review29 = Review(
        product_id=17,
        user_id=6,
        review="Building this garden house was a relaxing experience. The details are charming, and it looks great as a display piece.",
        stars=4,
        recommendation=True,
    )
    review30 = Review(
        product_id=19,
        user_id=7,
        review="This 3D puzzle is a unique and creative way to craft a flower bouquet. The pieces are well made and fit together nicely.",
        stars=5,
        recommendation=True,
    )
    review31 = Review(
        product_id=19,
        user_id=8,
        review="I love this puzzle! It was challenging but fun, and the finished bouquet looks beautiful on display.",
        stars=4,
        recommendation=True,
    )
    review32 = Review(
        product_id=20,
        user_id=1,
        review="These building blocks are so much fun! The vibrant colors and creative designs make it a great activity for all ages.",
        stars=4,
        recommendation=True,
    )
    review33 = Review(
        product_id=20,
        user_id=2,
        review="A perfect blend of creativity and fun. The flowers look amazing once assembled, and the blocks are sturdy.",
        stars=5,
        recommendation=True,
    )
    review34 = Review(
        product_id=21,
        user_id=2,
        review="This crochet tulip keychain is adorable! The craftsmanship is excellent, and it adds a sweet touch to my keys.",
        stars=4,
        recommendation=True,
    )
    review35 = Review(
        product_id=22,
        user_id=1,
        review="The beads are pretty, but the chain feels a bit flimsy. I’m worried it might break with regular use.",
        stars=2,
        recommendation=False,
    )
    review36 = Review(
        product_id=23,
        user_id=2,
        review="This pearl keychain is elegant and chic. It adds a touch of sophistication to my keys, and the quality is excellent.",
        stars=5,
        recommendation=True,
    )
    review37 = Review(
        product_id=24,
        user_id=2,
        review="This keychain set is so whimsical and fun! The designs are detailed, and it adds a playful touch to my keys.",
        stars=5,
        recommendation=True,
    )
    review38 = Review(
        product_id=24,
        user_id=3,
        review="I love the creative designs on this keychain! It’s well made and perfect for anyone who loves unique accessories.",
        stars=5,
        recommendation=True,
    )
    review39 = Review(
        product_id=24,
        user_id=7,
        review="The keychain is cute, but the pieces are small and feel a bit fragile. Not as durable as I hoped.",
        stars=2,
        recommendation=False,
    )
    
    
    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)
    db.session.add(review12)
    db.session.add(review13)
    db.session.add(review14)
    db.session.add(review15)
    db.session.add(review16)
    db.session.add(review17)
    db.session.add(review18)
    db.session.add(review19)
    db.session.add(review20)
    db.session.add(review21)
    db.session.add(review22)
    db.session.add(review23)
    db.session.add(review24)
    db.session.add(review25)
    db.session.add(review26)
    db.session.add(review27)
    db.session.add(review28)
    db.session.add(review29)
    db.session.add(review30)
    db.session.add(review31)
    db.session.add(review32)
    db.session.add(review33)
    db.session.add(review34)
    db.session.add(review35)
    db.session.add(review36)
    db.session.add(review37)
    db.session.add(review38)
    db.session.add(review39)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()