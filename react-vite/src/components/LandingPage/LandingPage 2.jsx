import "./LandingPage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAllProducts } from "../../redux/product";
import { Link } from "react-router-dom";

function LandingPage() {
  const dispatch = useDispatch();

  let user = useSelector((state) => state.session.user);

  let productsObj = useSelector((state) => {
    return state.products?.allProducts;
  });

  useEffect(() => {
    if (!productsObj) {
      dispatch(thunkAllProducts());
    }
  }, [dispatch, productsObj]);

  if (!productsObj) {
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

  const getRandomProduct = () => {
    const productKeys = Object.keys(productsObj);
    const randomKey =
      productKeys[Math.floor(Math.random() * productKeys.length)];
    return productsObj[randomKey];
  };

  const randomProduct = getRandomProduct();
  return (
    <>
      {user?.email ? (
        <>
          Welcome back, {user.first_name}!
          <div>
            <div>
              <h3>Featured Product:</h3>
              <div>
                <img
                  src={randomProduct.preview_image}
                  alt={randomProduct.title}
                />
              </div>
              <div>{randomProduct.title}</div>
              <div>{randomProduct.description}</div>
              <Link to="/products">Discover More</Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2>There&apos;s a Person Behind Every Piece</h2>

          <p>
            Fall in love with original finds from standout small shops around
            the world.
          </p>
          <Link to="/products">
            <button>Discover more</button>
          </Link>
        </>
      )}
    </>
  );
}

export default LandingPage;
