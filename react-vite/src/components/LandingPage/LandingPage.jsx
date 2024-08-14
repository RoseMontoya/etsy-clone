import "./LandingPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkRandomProduct } from "../../redux/product";
import Heart from "../Heart/Heart";
import { Link } from "react-router-dom";

function LandingPage() {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState(0)
  let user = useSelector((state) => state.session.user);

  let randomProduct = useSelector((state) => {
    return state.products.productById?.[productId];
  });

  useEffect(() => {
    if (!randomProduct) {
      dispatch(thunkRandomProduct())
        .then(res => {
          setProductId(res.id)
        })
    }
  }, [dispatch, randomProduct]);


  if (!randomProduct) {
    return <p>Loading products...</p>;
  }
  // console.log("Product from HomePage", products);
  // const getRandomProduct = () => {
  //   const productKeys = Object.keys(productsObj);
  //   const randomKey =
  //     productKeys[Math.floor(Math.random() * productKeys.length)];
  //   // console.log( "Random length",productKeys.length);
  //   return productsObj[randomKey];
  // };

  // const randomProduct = getRandomProduct();
  return (
    <div className="landing-page">
      {user?.email ? (
        <>
          <div className="welcome-message">Welcome back, {user.first_name}</div>
          <div className="featured-product">
            <img
              src={randomProduct.preview_image}
              alt={randomProduct.title}
            />
            <div className="product-info">
              <h3>Featured Product:</h3>
              <div>{randomProduct.title}</div>
              <div>{randomProduct.description}</div>
              <Link to="/products">Discover More</Link>
            </div>
          </div>
        </>
      ) : (
        <div className="no-user-message">
          <h2>There&apos;s a Person Behind Every Piece</h2>
          <p>
            Fall in love with original finds from standout small shops around
            the world.
          </p>
          <Link to="/products">
            <button>Discover more</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
