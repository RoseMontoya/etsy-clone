from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text

# Adds demo productImages
def seed_productImages():
    image1 = ProductImage(
        product_id=1,
        url="/images/product1_01.webp",
        preview=True
    )
    image2 = ProductImage(
        product_id=1,
        url="/images/product1_02.webp",
        preview=False
    )
    image3 = ProductImage(
        product_id=1,
        url="/images/product1_03.webp",
        preview=False
    )
    image4 = ProductImage(
        product_id=1,
        url="/images/product1_04.webp",
        preview=False
    )
    image5 = ProductImage(
        product_id=1,
        url="/images/product1_05.webp",
        preview=False
    )
    image6 = ProductImage(
        product_id=1,
        url="/images/product1_06.webp",
        preview=False
    )
    image7 = ProductImage(
        product_id=2,
        url="/images/product2_01.webp",
        preview=True
    )
    image8 = ProductImage(
        product_id=2,
        url="/images/product2_02.webp",
        preview=False
    )
    image9 = ProductImage(
        product_id=2,
        url="/images/product2_03.webp",
        preview=False
    )
    image10 = ProductImage(
        product_id=2,
        url="/images/product2_04.webp",
        preview=False
    )
    image11 = ProductImage(
        product_id=2,
        url="/images/product2_05.webp",
        preview=False
    )
    image12 = ProductImage(
        product_id=2,
        url="/images/product2_06.webp",
        preview=False
    )
    image13 = ProductImage(
        product_id=3,
        url="/images/product3_01.webp",
        preview=True
    )
    image14 = ProductImage(
        product_id=3,
        url="/images/product3_02.webp",
        preview=False
    )
    image15 = ProductImage(
        product_id=3,
        url="/images/product3_03.webp",
        preview=False
    )
    image16 = ProductImage(
        product_id=3,
        url="/images/product3_04.webp",
        preview=False
    )
    image17 = ProductImage(
        product_id=3,
        url="/images/product3_05.webp",
        preview=False
    )
    image18 = ProductImage(
        product_id=3,
        url="/images/product3_06.webp",
        preview=False
    )
    image19 = ProductImage(
        product_id=4,
        url="/images/product4_01.webp",
        preview=True
    )
    image20 = ProductImage(
        product_id=4,
        url="/images/product4_02.webp",
        preview=False
    )
    image21 = ProductImage(
        product_id=4,
        url="/images/product4_03.webp",
        preview=False
    )
    image22 = ProductImage(
        product_id=4,
        url="/images/product4_04.webp",
        preview=False
    )
    image23 = ProductImage(
        product_id=4,
        url="/images/product4_05.webp",
        preview=False
    )
    image24 = ProductImage(
        product_id=4,
        url="/images/product4_06.webp",
        preview=False
    )
    image25 = ProductImage(
        product_id=5,
        url="/images/product5_01.webp",
        preview=True
    )
    image26 = ProductImage(
        product_id=5,
        url="/images/product5_02.webp",
        preview=False
    )
    image27 = ProductImage(
        product_id=5,
        url="/images/product5_03.webp",
        preview=False
    )
    image28 = ProductImage(
        product_id=5,
        url="/images/product5_04.webp",
        preview=False
    )
    image29 = ProductImage(
        product_id=5,
        url="/images/product5_05.webp",
        preview=False
    )
    image30 = ProductImage(
        product_id=5,
        url="/images/product5_06.webp",
        preview=False
    )
    image31 = ProductImage(
        product_id=6,
        url="/images/product6_01.webp",
        preview=True
    )
    image32 = ProductImage(
        product_id=6,
        url="/images/product6_02.webp",
        preview=False
    )
    image33 = ProductImage(
        product_id=6,
        url="/images/product6_03.webp",
        preview=False
    )
    image34 = ProductImage(
        product_id=6,
        url="/images/product6_04.webp",
        preview=False
    )
    image35 = ProductImage(
        product_id=6,
        url="/images/product6_05.webp",
        preview=False
    )
    image36 = ProductImage(
        product_id=6,
        url="/images/product6_06.webp",
        preview=False
    )
    image37 = ProductImage(
        product_id=7,
        url="/images/product7_01.webp",
        preview=True
    )
    image38 = ProductImage(
        product_id=7,
        url="/images/product7_02.webp",
        preview=False
    )
    image39 = ProductImage(
        product_id=7,
        url="/images/product7_03.webp",
        preview=False
    )
    image40 = ProductImage(
        product_id=7,
        url="/images/product7_04.webp",
        preview=False
    )
    image41 = ProductImage(
        product_id=7,
        url="/images/product7_05.webp",
        preview=False
    )
    image42 = ProductImage(
        product_id=7,
        url="/images/product7_06.webp",
        preview=False
    )
    image43 = ProductImage(
        product_id=8,
        url="/images/product8_01.webp",
        preview=True
    )
    image44 = ProductImage(
        product_id=8,
        url="/images/product8_02.webp",
        preview=False
    )
    image45 = ProductImage(
        product_id=8,
        url="/images/product8_03.webp",
        preview=False
    )
    image46 = ProductImage(
        product_id=8,
        url="/images/product8_04.webp",
        preview=False
    )
    image47 = ProductImage(
        product_id=8,
        url="/images/product8_05.webp",
        preview=False
    )
    image48 = ProductImage(
        product_id=8,
        url="/images/product8_06.webp",
        preview=False
    )
    image49 = ProductImage(
        product_id=9,
        url="/images/product9_01.webp",
        preview=True
    )
    image50 = ProductImage(
        product_id=9,
        url="/images/product9_02.webp",
        preview=False
    )
    image51 = ProductImage(
        product_id=9,
        url="/images/product9_03.webp",
        preview=False
    )
    image52 = ProductImage(
        product_id=9,
        url="/images/product9_04.webp",
        preview=False
    )
    image53 = ProductImage(
        product_id=9,
        url="/images/product9_05.webp",
        preview=False
    )
    image54 = ProductImage(
        product_id=9,
        url="/images/product9_06.webp",
        preview=False
    )
    image55 = ProductImage(
        product_id=10,
        url="/images/product10_01.webp",
        preview=True
    )
    image56 = ProductImage(
        product_id=10,
        url="/images/product10_02.webp",
        preview=False
    )
    image57 = ProductImage(
        product_id=10,
        url="/images/product10_03.webp",
        preview=False
    )
    image58 = ProductImage(
        product_id=10,
        url="/images/product10_04.webp",
        preview=False
    )
    image59 = ProductImage(
        product_id=10,
        url="/images/product10_05.webp",
        preview=False
    )
    image60 = ProductImage(
        product_id=10,
        url="/images/product10_06.webp",
        preview=False
    )
    image61 = ProductImage(
        product_id=11,
        url="/images/product11_01.webp",
        preview=True
    )
    image62 = ProductImage(
        product_id=11,
        url="/images/product11_02.webp",
        preview=False
    )
    image63 = ProductImage(
        product_id=11,
        url="/images/product11_03.webp",
        preview=False
    )
    image64 = ProductImage(
        product_id=11,
        url="/images/product11_04.webp",
        preview=False
    )
    image65 = ProductImage(
        product_id=11,
        url="/images/product11_05.webp",
        preview=False
    )
    image66 = ProductImage(
        product_id=11,
        url="/images/product11_06.webp",
        preview=False
    )
    image67 = ProductImage(
        product_id=12,
        url="/images/product12_01.webp",
        preview=True
    )
    image68 = ProductImage(
        product_id=12,
        url="/images/product12_02.webp",
        preview=False
    )
    image69 = ProductImage(
        product_id=12,
        url="/images/product12_03.webp",
        preview=False
    )
    image70 = ProductImage(
        product_id=12,
        url="/images/product12_04.webp",
        preview=False
    )
    image71 = ProductImage(
        product_id=12,
        url="/images/product12_05.webp",
        preview=False
    )
    image72 = ProductImage(
        product_id=12,
        url="/images/product12_06.webp",
        preview=False
    )
    image73 = ProductImage(
        product_id=13,
        url="/images/product13_01.webp",
        preview=True
    )
    image74 = ProductImage(
        product_id=13,
        url="/images/product13_02.webp",
        preview=False
    )
    image75 = ProductImage(
        product_id=13,
        url="/images/product13_03.webp",
        preview=False
    )
    image76 = ProductImage(
        product_id=13,
        url="/images/product13_04.webp",
        preview=False
    )
    image77 = ProductImage(
        product_id=13,
        url="/images/product13_05.webp",
        preview=False
    )
    image78 = ProductImage(
        product_id=13,
        url="/images/product13_06.webp",
        preview=False
    )
    image79 = ProductImage(
        product_id=14,
        url="/images/product14_01.webp",
        preview=True
    )
    image80 = ProductImage(
        product_id=14,
        url="/images/product14_02.webp",
        preview=False
    )
    image81 = ProductImage(
        product_id=14,
        url="/images/product14_03.webp",
        preview=False
    )
    image82 = ProductImage(
        product_id=14,
        url="/images/product14_04.webp",
        preview=False
    )
    image83 = ProductImage(
        product_id=14,
        url="/images/product14_05.webp",
        preview=False
    )
    image84 = ProductImage(
        product_id=14,
        url="/images/product14_06.webp",
        preview=False
    )
    image85 = ProductImage(
        product_id=15,
        url="/images/product15_01.webp",
        preview=True
    )
    image86 = ProductImage(
        product_id=15,
        url="/images/product15_02.webp",
        preview=False
    )
    image87 = ProductImage(
        product_id=15,
        url="/images/product15_03.webp",
        preview=False
    )
    image88 = ProductImage(
        product_id=15,
        url="/images/product15_04.webp",
        preview=False
    )
    image89 = ProductImage(
        product_id=15,
        url="/images/product15_05.webp",
        preview=False
    )
    image90 = ProductImage(
        product_id=15,
        url="/images/product15_06.webp",
        preview=False
    )
    image91 = ProductImage(
        product_id=16,
        url="/images/product16_01.webp",
        preview=True
    )
    image92 = ProductImage(
        product_id=16,
        url="/images/product16_02.webp",
        preview=False
    )
    image93 = ProductImage(
        product_id=16,
        url="/images/product16_03.webp",
        preview=False
    )
    image94 = ProductImage(
        product_id=16,
        url="/images/product16_04.webp",
        preview=False
    )
    image95 = ProductImage(
        product_id=16,
        url="/images/product16_05.webp",
        preview=False
    )
    image96 = ProductImage(
        product_id=16,
        url="/images/product16_06.webp",
        preview=False
    )
    image97 = ProductImage(
        product_id=17,
        url="/images/product17_01.webp",
        preview=True
    )
    image98 = ProductImage(
        product_id=17,
        url="/images/product17_02.webp",
        preview=False
    )
    image99 = ProductImage(
        product_id=17,
        url="/images/product17_03.webp",
        preview=False
    )
    image100 = ProductImage(
        product_id=17,
        url="/images/product17_04.webp",
        preview=False
    )
    image101 = ProductImage(
        product_id=17,
        url="/images/product17_05.webp",
        preview=False
    )
    image102 = ProductImage(
        product_id=17,
        url="/images/product17_06.webp",
        preview=False
    )
    image103 = ProductImage(
        product_id=18,
        url="/images/product18_01.webp",
        preview=True
    )
    image104 = ProductImage(
        product_id=18,
        url="/images/product18_02.webp",
        preview=False
    )
    image105 = ProductImage(
        product_id=18,
        url="/images/product18_03.webp",
        preview=False
    )
    image106 = ProductImage(
        product_id=18,
        url="/images/product18_04.webp",
        preview=False
    )
    image107 = ProductImage(
        product_id=18,
        url="/images/product18_05.webp",
        preview=False
    )
    image108 = ProductImage(
        product_id=18,
        url="/images/product18_06.webp",
        preview=False
    )
    image109 = ProductImage(
        product_id=19,
        url="/images/product19_01.webp",
        preview=True
    )
    image110 = ProductImage(
        product_id=19,
        url="/images/product19_02.webp",
        preview=False
    )
    image111 = ProductImage(
        product_id=19,
        url="/images/product19_03.webp",
        preview=False
    )
    image112 = ProductImage(
        product_id=19,
        url="/images/product19_04.webp",
        preview=False
    )
    image113 = ProductImage(
        product_id=19,
        url="/images/product19_05.webp",
        preview=False
    )
    image114 = ProductImage(
        product_id=19,
        url="/images/product19_06.webp",
        preview=False
    )
    image115 = ProductImage(
        product_id=20,
        url="/images/product20_01.webp",
        preview=True
    )
    image116 = ProductImage(
        product_id=20,
        url="/images/product20_02.webp",
        preview=False
    )
    image117 = ProductImage(
        product_id=20,
        url="/images/product20_03.webp",
        preview=False
    )
    image118 = ProductImage(
        product_id=20,
        url="/images/product20_04.webp",
        preview=False
    )
    image119 = ProductImage(
        product_id=20,
        url="/images/product20_05.webp",
        preview=False
    )
    image120 = ProductImage(
        product_id=20,
        url="/images/product20_06.webp",
        preview=False
    )
    image121 = ProductImage(
        product_id=21,
        url="/images/product21_01.webp",
        preview=True
    )
    image122 = ProductImage(
        product_id=21,
        url="/images/product21_02.webp",
        preview=False
    )
    image123 = ProductImage(
        product_id=21,
        url="/images/product21_03.webp",
        preview=False
    )
    image124 = ProductImage(
        product_id=21,
        url="/images/product21_04.webp",
        preview=False
    )
    image125 = ProductImage(
        product_id=21,
        url="/images/product21_05.webp",
        preview=False
    )
    image126 = ProductImage(
        product_id=21,
        url="/images/product21_06.webp",
        preview=False
    )
    image127 = ProductImage(
        product_id=22,
        url="/images/product22_01.webp",
        preview=True
    )
    image128 = ProductImage(
        product_id=22,
        url="/images/product22_02.webp",
        preview=False
    )
    image129 = ProductImage(
        product_id=22,
        url="/images/product22_03.webp",
        preview=False
    )
    image130 = ProductImage(
        product_id=22,
        url="/images/product22_04.webp",
        preview=False
    )
    image131 = ProductImage(
        product_id=22,
        url="/images/product22_05.webp",
        preview=False
    )
    image132 = ProductImage(
        product_id=22,
        url="/images/product22_06.webp",
        preview=False
    )
    image133 = ProductImage(
        product_id=23,
        url="/images/product23_01.webp",
        preview=True
    )
    image134 = ProductImage(
        product_id=23,
        url="/images/product23_02.webp",
        preview=False
    )
    image135 = ProductImage(
        product_id=23,
        url="/images/product23_03.webp",
        preview=False
    )
    image136 = ProductImage(
        product_id=23,
        url="/images/product23_04.webp",
        preview=False
    )
    image137 = ProductImage(
        product_id=23,
        url="/images/product23_05.webp",
        preview=False
    )
    image138 = ProductImage(
        product_id=23,
        url="/images/product23_06.webp",
        preview=False
    )
    image139 = ProductImage(
        product_id=24,
        url="/images/product24_01.webp",
        preview=True
    )
    image140 = ProductImage(
        product_id=24,
        url="/images/product24_02.webp",
        preview=False
    )
    image141 = ProductImage(
        product_id=24,
        url="/images/product24_03.webp",
        preview=False
    )
    image142 = ProductImage(
        product_id=24,
        url="/images/product24_04.webp",
        preview=False
    )
    image143 = ProductImage(
        product_id=24,
        url="/images/product24_05.webp",
        preview=False
    )
    image144 = ProductImage(
        product_id=24,
        url="/images/product24_06.webp",
        preview=False
    )
    image145 = ProductImage(
        product_id=25,
        url="/images/product25_01.webp",
        preview=True
    )
    image146 = ProductImage(
        product_id=25,
        url="/images/product25_02.webp",
        preview=False
    )
    image147 = ProductImage(
        product_id=25,
        url="/images/product25_03.webp",
        preview=False
    )
    image148 = ProductImage(
        product_id=25,
        url="/images/product25_04.webp",
        preview=False
    )
    image149 = ProductImage(
        product_id=25,
        url="/images/product25_05.webp",
        preview=False
    )
    image150 = ProductImage(
        product_id=25,
        url="/images/product25_06.webp",
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
    db.session.add(image31)
    db.session.add(image32)
    db.session.add(image33)
    db.session.add(image34)
    db.session.add(image35)
    db.session.add(image36)
    db.session.add(image37)
    db.session.add(image38)
    db.session.add(image39)
    db.session.add(image40)
    db.session.add(image41)
    db.session.add(image42)
    db.session.add(image43)
    db.session.add(image44)
    db.session.add(image45)
    db.session.add(image46)
    db.session.add(image47)
    db.session.add(image48)
    db.session.add(image49)
    db.session.add(image50)
    db.session.add(image51)
    db.session.add(image52)
    db.session.add(image53)
    db.session.add(image54)
    db.session.add(image55)
    db.session.add(image56)
    db.session.add(image57)
    db.session.add(image58)
    db.session.add(image59)
    db.session.add(image60)
    db.session.add(image61)
    db.session.add(image62)
    db.session.add(image63)
    db.session.add(image64)
    db.session.add(image65)
    db.session.add(image66)
    db.session.add(image67)
    db.session.add(image68)
    db.session.add(image69)
    db.session.add(image70)
    db.session.add(image71)
    db.session.add(image72)
    db.session.add(image73)
    db.session.add(image74)
    db.session.add(image75)
    db.session.add(image76)
    db.session.add(image77)
    db.session.add(image78)
    db.session.add(image79)
    db.session.add(image80)
    db.session.add(image81)
    db.session.add(image82)
    db.session.add(image83)
    db.session.add(image84)
    db.session.add(image85)
    db.session.add(image86)
    db.session.add(image87)
    db.session.add(image88)
    db.session.add(image89)
    db.session.add(image90)
    db.session.add(image91)
    db.session.add(image92)
    db.session.add(image93)
    db.session.add(image94)
    db.session.add(image95)
    db.session.add(image96)
    db.session.add(image97)
    db.session.add(image98)
    db.session.add(image99)
    db.session.add(image100)
    db.session.add(image101)
    db.session.add(image102)
    db.session.add(image103)
    db.session.add(image104)
    db.session.add(image105)
    db.session.add(image106)
    db.session.add(image107)
    db.session.add(image108)
    db.session.add(image109)
    db.session.add(image110)
    db.session.add(image111)
    db.session.add(image112)
    db.session.add(image113)
    db.session.add(image114)
    db.session.add(image115)
    db.session.add(image116)
    db.session.add(image117)
    db.session.add(image118)
    db.session.add(image119)
    db.session.add(image120)
    db.session.add(image121)
    db.session.add(image122)
    db.session.add(image123)
    db.session.add(image124)
    db.session.add(image125)
    db.session.add(image126)
    db.session.add(image127)
    db.session.add(image128)
    db.session.add(image129)
    db.session.add(image130)
    db.session.add(image131)
    db.session.add(image132)
    db.session.add(image133)
    db.session.add(image134)
    db.session.add(image135)
    db.session.add(image136)
    db.session.add(image137)
    db.session.add(image138)
    db.session.add(image139)
    db.session.add(image140)
    db.session.add(image141)
    db.session.add(image142)
    db.session.add(image143)
    db.session.add(image144)
    db.session.add(image145)
    db.session.add(image146)
    db.session.add(image147)
    db.session.add(image148)
    db.session.add(image149)
    db.session.add(image150)


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