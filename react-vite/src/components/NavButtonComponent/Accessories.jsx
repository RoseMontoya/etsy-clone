import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { thunkAllProducts } from "../../redux/product";
import { addToCart, getAllCartItems } from "../../redux/cart";
import { favoritesByUserId } from "../../redux/favorite";
import { Heart, Stars } from "../SubComponents";
import "./Accessories.css";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import { useModal } from "../../context/Modal"; // Import the modal context
import OwnProductConflictModal from "../SubComponents/OwnProductConflictModal";

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setModalContent } = useModal(); // Use the modal context to trigger the login modal
  const productsObj = useSelector((state) => state.products?.allProducts);
  const user = useSelector((state) => state.session.user);
  const rawProducts = productsObj ? Object.values(productsObj) : [];
  const products = rawProducts.filter((product) => product.category_id === 2);
  const favoritesObj = useSelector((state) => state.favorites?.[user?.id]);
  const favProducts = favoritesObj
    ? Object.values(favoritesObj).map((fav) => fav.product_id)
    : [];

  useEffect(() => {
    if (!productsObj) {
      dispatch(thunkAllProducts());
    }
    if (!favoritesObj && user) {
      dispatch(favoritesByUserId(user?.id));
    }
  }, [dispatch, productsObj, favoritesObj, user]);

  if (!productsObj)
    return (
      <div className="center-loading">
        <div className="lds-roller">
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
    if (user.id === cartItem.product.seller.id) {
      setModalContent(<OwnProductConflictModal />);
      return;
    }

    dispatch(addToCart(cartItem)).then(() => {
      dispatch(getAllCartItems()).then(() => {
        navigate("/cart"); // Redirect to the cart page after updating the cart
      });
    });
  };

  return (
    <main>
      <div className="product_container">
        {products.length ? (
          products.map((product) => (
            <div key={product?.id} className="product_small_container">
              {user ? (
                <Heart
                  initial={favProducts.includes(product.id) ? true : false}
                  productId={product.id}
                  sellerId={product.seller.id}
                />
              ) : (
                <OpenModalMenuItem
                  itemText={<Heart initial={false} productId={product.id} />}
                  modalComponent={<LoginFormModal />}
                />
              )}
              <Link key={product?.id} to={`/products/${product?.id}`}>
                <img src={product.preview_image} alt={product.title} />
                <p>{product.title}</p>
                <div className="inline">
                  <Stars rating={product.seller.seller_rating} />
                  <span>({product.seller.review_count})</span>
                </div>
                <p className="bold">${product.price.toFixed(2)}</p>
                <p>{product.seller.username}</p>
              </Link>
              {user ? (
                <button onClick={() => handleAddToCart(product)}>
                  + Add to cart
                </button>
              ) : (
                <OpenModalMenuItem
                  className="signed_off_button"
                  itemText="+ Add to cart"
                  modalComponent={<LoginFormModal />}
                />
              )}
            </div>
          ))
        ) : (
          <h2>No products to sell. Please check back later.</h2>
        )}
      </div>
      {/* <div id="add_fav" style={{display: 'none'}} ><p>Saved to Favorites</p></div>
        <div id="remove_fav" style={{display: 'none'}} ><p>Removed from Favorites</p></div> */}
    </main>
  );
}

export default ProductList;
