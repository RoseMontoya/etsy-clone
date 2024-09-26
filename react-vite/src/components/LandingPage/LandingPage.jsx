// React Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Redux Imports
import { thunkRandomProduct } from "../../redux";
// Design Imports
import "./LandingPage.css";
import { IoRefreshCircleOutline } from "react-icons/io5";

// Helper Imports
import { Loading } from "../SubComponents";

function LandingPage() {
  const dispatch = useDispatch();

  // State to keep track of the random product's ID
  const [productId, setProductId] = useState(0);

  // Get the current user from the Redux store
  let user = useSelector((state) => state.session.user);

  // Get the random product from the Redux store using the product ID
  let randomProduct = useSelector((state) => {
    return state.products.productById?.[productId];
  });

  useEffect(() => {
    // Fetch a random product if it hasn't been loaded yet
    if (!randomProduct) {
      dispatch(thunkRandomProduct()).then((res) => {
        setProductId(res.id);
      });
    }
  }, [dispatch, randomProduct]);

  const handleRefreshClick = () => {
    dispatch(thunkRandomProduct()).then((res) => {
      setProductId(res.id);
    });
  };

  // Show loading spinner while the random product is being fetched
  if (!randomProduct) return <Loading />;

  return (
    <main className="landing-page">
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
        // Display a message and featured product for users who are not logged in
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
            <div className="random-pic" style={{ position: "relative" }}>
              <img
                src={randomProduct.preview_image}
                alt={randomProduct.title}
              />
              <div className="refresh-icon" onClick={handleRefreshClick}>
                <IoRefreshCircleOutline />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default LandingPage;
