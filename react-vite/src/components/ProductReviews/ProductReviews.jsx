// React Imports
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux/Component Imports
import { deleteReview, getAllReviews } from "../../redux";
import { OpenModalMenuItem, ReviewFormModal, DeleteReview } from "../";
import { Stars } from "../SubComponents";
import { useModal } from "../../context/Modal";

// Design Imports
import "./ProductReview.css";
import { FaCheck } from "react-icons/fa";

// Function to format dates
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function ProductReviews({ productId, sellerId }) {
  const dispatch = useDispatch();
  const { closeModal, setModalContent } = useModal();

  // Select reviews for the specific product from Redux store
  const reviewsObj = useSelector(
    (state) => state.reviews.reviewsByProdId?.[productId]
  );
  const user = useSelector((state) => state.session.user?.username); // Get the current user's username

  // Convert reviews object to an array
  const reviews = reviewsObj ? Object.values(reviewsObj) : [];

  useEffect(() => {
    // Fetch reviews if they are not already in the Redux store
    if (!reviewsObj) {
      dispatch(getAllReviews(productId));
    }
  }, [dispatch, productId, reviewsObj]);

  // Display loading message if reviews are not loaded yet
  if (!reviewsObj) return <h2>Loading...</h2>;

  // Handle review deletion by opening a confirmation modal
  const handleDelete = (reviewId) => {
    setModalContent(
      <DeleteReview
        onDelete={() => deleteConfirm(reviewId, productId)}
        onClose={() => closeModal()}
      />
    );
  };

  // Confirm deletion of a review and close the modal
  const deleteConfirm = async (reviewId, productId) => {
    await dispatch(deleteReview(reviewId, productId, sellerId));
    closeModal();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column-reverse" }}>
      {reviews.map((review) => (
        <div key={review?.id} className="review-container">
          <div className="review-header">
            <Stars rating={review.stars} />
            {review.recommendation && (
              <div className="recommendation">
                <FaCheck id="check-icon" />{" "}
                <p className="rec-text">Recommends this item</p>
              </div>
            )}
          </div>

          <div className="review-content">
            <p>{review.review}</p>
          </div>

          <div className="review-footer">
            <div className="review-user-info">
              <p className="review-user">{review.user}</p>
              <p className="review-date">{formatDate(review.updated_at)}</p>
            </div>

            <div className="review-actions">
              <OpenModalMenuItem
                className={`${review.user !== user ? "hidden" : "edit-review"}`}
                itemText="Edit Review"
                modalComponent={
                  <ReviewFormModal
                    productId={productId}
                    formType={"edit"}
                    reviewId={review.id}
                    sellerId={sellerId}
                  />
                }
              />
              <button
                className={`${
                  review.user !== user ? "hidden" : "delete-review"
                }`}
                onClick={() => handleDelete(review.id)}
              >
                Delete Review
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductReviews;
