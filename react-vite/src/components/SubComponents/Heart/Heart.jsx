// React Imports
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Redux/Component Imports
import { addFavorite, removeFavorite } from "../../../redux";
import OwnProductConflictModal from "../OwnProductConflictModal";
import { useModal } from "../../../context/Modal";
// Design Imports
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import "./Heart.css";

function Heart({ initial, productId, sellerId }) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal(); // Use the modal context to trigger the login modal
  const [favorited, setFavorited] = useState(initial);
  const user = useSelector((state) => state.session.user);

  const handleUnfavorite = (productId) => {
    if (user.id === sellerId) {
      setModalContent(<OwnProductConflictModal />);
      return;
    }

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
    if (user.id === sellerId) {
      setModalContent(<OwnProductConflictModal />);
      return;
    }
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
    <>
      {favorited ? (
        <div
          className="heart remove_from_fav"
          onClick={user ? () => handleUnfavorite(productId) : null}
        >
          <FaHeart color="#b60130" />
        </div>
      ) : (
        <div
          className="heart-invisible add_to_fav"
          onClick={user ? () => handleFavorite(productId) : null}
        >
          <FaRegHeart />
        </div>
      )}
    </>
  );
}

export default Heart;
