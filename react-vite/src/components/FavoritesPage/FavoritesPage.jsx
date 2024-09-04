import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { favoritesByUserId } from "../../redux/favorite";
import { addToCart, getAllCartItems } from "../../redux/cart";
import { useNavigate } from "react-router-dom";
import { Heart } from "../SubComponents";
import { TiStarFullOutline } from "react-icons/ti";
import "./FavoritesPage.css";
import { thunkAllProducts } from "../../redux/product";

function FavoritesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select the current user, their favorites, and all products from the Redux store
  const user = useSelector((state) => state.session.user);
  const favorites = useSelector((state) => state.favorites?.[user?.id]);
  const allProducts = useSelector((state) => state.products.allProducts);

  // Convert the favorites object to an array for easier iteration
  const favoritesArray = favorites ? Object.values(favorites) : [];

  useEffect(() => {
    // Fetch user favorites and all products if not already loaded
    if (!favorites) {
      dispatch(favoritesByUserId(user.id));
    }
    if (!allProducts) {
      dispatch(thunkAllProducts());
    }
  }, [dispatch, favorites, allProducts, user.id]);

  // Show loading spinner if favorites are not yet loaded
  if (!favorites) return (<main>
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
    </main>
  );

  // Handler to add a product to the cart
  const handleAddToCart = (product) => {
    const cartItem = {
      product_id: product.id,
      quantity: 1,
      gift: false,
      cart_id: user.cart_id,
      product: product, // The entire product object
    };

    // Dispatch action to add the item to the cart, then fetch all cart items, and navigate to the cart page
    dispatch(addToCart(cartItem)).then(() => {
      dispatch(getAllCartItems()).then(() => {
        navigate("/cart"); // Redirect to the cart page after updating the cart
      });
    });
  };

  return (
    <main>
    <div className="product_manage_header">
      <div className="favorite_profile">
        <img src={user.profile_url} alt={user.username} />
        <h2>Your Favorites</h2>
      </div>
      </div>
      <div className="grid_container">
        {favoritesArray.length && allProducts ? (
          favoritesArray.map((favorite) => {
            return allProducts[favorite.product_id] ? (
              <div key={favorite.id} className="grid-item" id="fav-grid-item">
                <Heart initial={true} productId={favorite.product_id} />
                <Link key={favorite.id} to={`/products/${favorite.product_id}`}>
                  <div className="image_container">
                    <img
                      src={allProducts[favorite.product_id].preview_image}
                      style={{ width: "100%" }}
                      alt={allProducts[favorite.product_id].title}
                    />
                  </div>
                  <div className="grid-item-detail">
                    <div className='upper-fav-details'>
                      <p className="title">
                        {allProducts[favorite.product_id].title}
                      </p>
                      <div className="rating">
                        <p className="bold" style={{fontSize: '14px'}}>{allProducts[favorite.product_id].seller.seller_rating}</p>
                        <TiStarFullOutline />
                        <span className="count">
                          ({allProducts[favorite.product_id].seller.review_count})
                        </span>
                      </div>
                    </div>
                    <p className="bold" style={{fontSize: '20px'}}>${allProducts[favorite.product_id].price.toFixed(2)}</p>
                  </div>
                </Link>
                <button
                  onClick={() =>
                    handleAddToCart(allProducts[favorite.product_id])
                  }
                >
                  + Add to cart
                </button>
              </div>
            ) : null;
          })
        ) : (
          <p>
            Start favoriting items to compare, shop, and keep track of things
            you love.
          </p>
        )}
      </div>
    </main>
  );
}

export default FavoritesPage;
