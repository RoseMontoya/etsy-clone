// React Imports
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Redux Imports
import {
  thunkAllProducts,
  addToCart,
  getAllCartItems,
  favoritesByUserId,
} from "../../redux";

// Component Imports
import { OpenModalMenuItem, LoginFormModal } from "../";
import { Heart, Stars, OwnProductConflictModal } from "../SubComponents";
import { useModal } from "../../context/Modal";

// Design Imports
import { FaPlus } from "react-icons/fa6";
import "./ProductList.css";

// Helper Imports
import Loading from "../SubComponents";

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setModalContent } = useModal(); // Use the modal context to trigger the login modal

  // Selectors to access Redux state
  const productsObj = useSelector((state) => state.products?.allProducts);
  const user = useSelector((state) => state.session.user);
  const products = productsObj ? Object.values(productsObj) : [];
  const favoritesObj = useSelector((state) => state.favorites?.[user?.id]);
  const favProducts = favoritesObj
    ? Object.values(favoritesObj).map((fav) => fav.product_id)
    : [];

  useEffect(() => {
    // Fetch all products and user favorites if not already available
    if (!productsObj) {
      dispatch(thunkAllProducts());
    }
    if (!favoritesObj && user) {
      dispatch(favoritesByUserId(user?.id));
    }
  }, [dispatch, productsObj, favoritesObj, user]);

  // Show loading spinner if products are not yet loaded
  if (!productsObj) <Loading />;

  if (products.length === 0)
    return (
      <main>
        <div className="center-in-page">
          <h2>No products for sell. Please check back later.</h2>
        </div>
      </main>
  );

  // Show message if there are no products to display
  if (products.length === 0) return (<main><div className="center-in-page"><h2>No products for sell. Please check back later.</h2></div></main>)

  // Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    if (!user) {
      // If the user is not logged in, open the login modal
      setModalContent(<LoginFormModal />);
      return;
    }
    const cartItem = {
      product_id: product.id,
      quantity: 1,
      gift: false,
      cart_id: user.cart_id,
      product: product, // The entire product object
    };

    // Check if the user is trying to add their own product to the cart
    if (user.id === cartItem.product.seller.id) {
      setModalContent(<OwnProductConflictModal />);
      return;
    }

    // Add the product to the cart and navigate to the cart page
    dispatch(addToCart(cartItem)).then(() => {
      dispatch(getAllCartItems()).then(() => {
        navigate("/cart"); // Redirect to the cart page after updating the cart
      });
    });
  };

  return (
    <main className="prod-list">
      <div className="grid_container">
        {products.length ? (
          products
            .sort((a, b) => b.id - a.id)
            .map((product) => (
              <div key={product?.id} className="grid-item">
                <div>
                  {user ? (
                    <Heart
                      initial={favProducts.includes(product.id) ? true : false}
                      productId={product.id}
                      sellerId={product.seller.id}
                    />
                  ) : (
                    <OpenModalMenuItem
                      itemText={
                        <Heart
                          initial={false}
                          productId={product.id}
                          sellerId={product.seller.id}
                        />
                      }
                      modalComponent={
                        <LoginFormModal text={"Before you do that..."} />
                      }
                    />
                  )}
                  <Link key={product?.id} to={`/products/${product?.id}`}>
                    <div className="image_container">
                      <img src={product.preview_image} alt={product.title} />
                    </div>
                    <div className="product-details">
                      <p className="title">{product.title}</p>
                      <div className="rating">
                        {product.seller.review_count > 0 ? (
                          <Stars rating={product.seller.seller_rating} />
                        ) : (
                          <p className="bold">New </p>
                        )}
                        <span className="count">
                          ({product.seller.review_count})
                        </span>
                      </div>
                      <p style={{ fontSize: "14px" }}>
                        {product.seller.username}
                      </p>
                      <p className="bold">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                </div>
                <div>
                  {user ? (
                    <button
                      className="add-to-cart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaPlus /> Add to cart
                    </button>
                  ) : (
                    <OpenModalMenuItem
                      className="signed_off_button"
                      itemText="+ Add to cart"
                      modalComponent={
                        <LoginFormModal text={"Before you do that..."} />
                      }
                    />
                  )}
                </div>
              </div>
            ))
        ) : (
          <h2>No products for sell. Please check back later.</h2>
        )}
      </div>
    </main>
  );
}

export default ProductList;
