import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { favoritesByUserId } from "../../redux/favorite";
import { addToCart, getAllCartItems } from "../../redux/cart";
import { useNavigate } from "react-router-dom";
import {Heart} from "../SubComponents";
import { TiStarFullOutline } from "react-icons/ti";
import "./FavoritesPage.css";

function FavoritesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const favorites = useSelector((state) => state.favorites?.[user.id]);

  const favoritesArray = favorites ? Object.values(favorites) : [];
  console.log("...", favoritesArray);

  useEffect(() => {
    if (!favorites) {
      dispatch(favoritesByUserId(user.id));
    }
  }, [dispatch, favorites, user.id]);

  if (!favorites) return <p>Loading...</p>;

  const handleAddToCart = (product) => {
    const cartItem = {
      product_id: product.id,
      quantity: 1,
      gift: false,
      cart_id: user.cart_id,
      product: product, // The entire product object
    };
    dispatch(addToCart(cartItem)).then(() => {
      dispatch(getAllCartItems()).then(() => {
        navigate("/cart"); // Redirect to the cart page after updating the cart
      });
    });
  };



  return (
    <main>
      <div className="favorite_profile">
        <img src={user.profile_url} alt={user.username} />
        <p>{user.first_name}&apos;s Favorites</p>
      </div>
      <div className="grid_container">
        {favoritesArray.length ? (
          favoritesArray.map((favorite) => (
            <div key={favorite.id} className="grid-item">
            <Heart initial={true} productId={favorite.product.id}/>
              <Link key={favorite.id} to={`/products/${favorite.product.id}`}>
                <div className="image_container">
                  <img
                    src={favorite.product.preview_image}
                    alt={favorite.product.title}
                  />
                </div>
                <p>{favorite.product.title}</p>
                <p>${favorite.product.price.toFixed(2)}</p>
                <p>
                  {favorite.product.seller.seller_rating}
                  <TiStarFullOutline />({favorite.product.seller.review_count})
                </p>
              </Link>
              <button onClick={() => handleAddToCart(favorite.product)}>
              + Add to cart
            </button>
            </div>
          ))
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