import "./LandingPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkRandomProduct } from "../../redux/product";
import { Link } from "react-router-dom";

function LandingPage() {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState(0);
  let user = useSelector((state) => state.session.user);

  let randomProduct = useSelector((state) => {
    return state.products.productById?.[productId];
  });

  useEffect(() => {
    if (!randomProduct) {
      dispatch(thunkRandomProduct()).then((res) => {
        setProductId(res.id);
      });
    }
  }, [dispatch, randomProduct]);

  if (!randomProduct) {
    return (
      <div className="center-loading">
        <div className="lds-roller ">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="landing-page">
      {user?.email ? (
        <>
          <div className="welcome-message">
            Welcome back, {user.first_name}!
          </div>
          <div className="back-to-school">
            <h2>Back-to-school savings are here!</h2>
            <Link to="/products">
              <button>Shop now</button>
            </Link>
          </div>
          <div className="featured-product">
            <img src={randomProduct.preview_image} alt={randomProduct.title} />
            <div className="product-info">
              <h3>Featured Product:</h3>
              <div>{randomProduct.title}</div>
              <div>{randomProduct.description}</div>
              <Link to={`/products/${randomProduct.id}`}>See this product</Link>
            </div>
          </div>
        </>
      ) : (
        <div className="no-user-message">
          <h2>There&apos;s a person</h2>
          <h2>behind every piece</h2>
          <div className="featured-product_signed_out">
            <div className="product-info_signed_out">
              <h3>Sold by {randomProduct.seller.first_name}</h3>
              <div>{randomProduct.title}</div>
              <Link to={`/products/${randomProduct.id}`}>
                <button>See this product</button>
              </Link>
            </div>
            <div style={{ position: "relative" }}>
              <img
                src={randomProduct.preview_image}
                alt={randomProduct.title}
              />
            </div>
          </div>

          {/* <p>
            Fall in love with original finds from standout small shops around
            the world.
          </p> */}
        </div>
      )}
    </div>
  );
}

export default LandingPage;
