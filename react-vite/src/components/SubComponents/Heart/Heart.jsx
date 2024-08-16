import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addFavorite, removeFavorite } from "../../../redux/favorite";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import "./Heart.css";

function Heart({ initial, productId }) {
  const dispatch = useDispatch();
  const [favorited, setFavorited] = useState(initial);
  const user = useSelector((state) => state.session.user);
  const handleUnfavorite = (productId) => {
    dispatch(removeFavorite(productId)).then(() => {
      const popUpRemoved = document.getElementById("remove_fav");
      popUpRemoved.style.display = "block";
      setTimeout(() => {
        popUpRemoved.style.display = "none";
      }, 2000);
      setFavorited(false);
    });
  };

  const handleFavorite = (productId) => {
    dispatch(addFavorite(productId)).then(() => {
      const popUpSaved = document.getElementById("add_fav");
      popUpSaved.style.display = "block";
      setTimeout(() => {
        popUpSaved.style.display = "none";
      }, 2000);
      setFavorited(true);
    });
  };

  return (
    <div>
      {favorited ? (
        <div
          className="heart remove_from_fav"
          onClick={user ? () => handleUnfavorite(productId) : null}
        >
          <FaHeart color="#b60130" />
        </div>
      ) : (
        <div
          className="heart add_to_fav"
          onClick={user ? () => handleFavorite(productId) : null}
        >
          <FaRegHeart />
        </div>
      )}
    </div>
  );
}

export default Heart;
