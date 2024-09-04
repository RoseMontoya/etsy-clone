import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addFavorite, removeFavorite } from "../../../redux/favorite";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import "./Heart.css";
import OwnProductConflictModal from "../OwnProductConflictModal";
import { useModal } from "../../../context/Modal"; // Import the modal context

function Heart({ initial, productId, sellerId }) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal(); // Use the modal context to trigger the login modal
  const [favorited, setFavorited] = useState(initial); // State to track if the product is favorited
  const user = useSelector((state) => state.session.user); // Selector to get the current user from the Redux store

  // Function to handle unfavoriting a product
  const handleUnfavorite = (productId) => {
    // If the user is the seller of the product, show a modal instead of removing from favorites
    if (user.id === sellerId) {
      setModalContent(<OwnProductConflictModal />);
      return;
    }

    // Dispatch the action to remove the product from favorites
    dispatch(removeFavorite(productId)).then(() => {
      const popUpRemoved = document.getElementById("remove_fav");
      popUpRemoved.style.display = "block"; // Show "Removed from favorites" notification
      setTimeout(() => {
        popUpRemoved.style.display = "none"; // Hide notification after 2 seconds
      }, 2000);
      setFavorited(false); // Update state to reflect that the product is no longer favorited
    });
  };

  // Function to handle favoriting a product
  const handleFavorite = (productId) => {
    // If the user is the seller of the product, show a modal instead of adding to favorites
    if (user.id === sellerId) {
      setModalContent(<OwnProductConflictModal />);
      return;
    }
    // Dispatch the action to add the product to favorites
    dispatch(addFavorite(productId)).then(() => {
      const popUpSaved = document.getElementById("add_fav");
      popUpSaved.style.display = "block"; // Show "Added to favorites" notification
      setTimeout(() => {
        popUpSaved.style.display = "none"; // Hide notification after 2 seconds
      }, 2000);
      setFavorited(true); // Update state to reflect that the product is now favorited
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
