import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { favoritesByUserId } from "../../redux/favorite";
import Heart from "../Heart/Heart";
import { TiStarFullOutline } from "react-icons/ti";
import "./FavoritesPage.css";

function FavoritesPage() {
  const dispatch = useDispatch();
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
              <button><Link to="/cart">Add to cart</Link></button>
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
