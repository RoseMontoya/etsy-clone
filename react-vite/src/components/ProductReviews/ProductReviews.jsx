import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getAllReviews } from "../../redux/review";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ReviewFormModal from "../ReviewFormModal";
import './ProductReview.css'
import { useModal } from '../../context/Modal';
import DeleteReview from "../DeleteReviewModal";
import Stars from '../SubComponents/Stars'
import { FaCheck } from "react-icons/fa";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function ProductReviews({ productId, sellerId }) {
  const dispatch = useDispatch();
  const { closeModal, setModalContent } = useModal()

  const reviewsObj = useSelector(
    (state) => state.reviews.reviewsByProdId?.[productId]
  );
  const user = useSelector(state => state.session.user?.username)

  const reviews = reviewsObj ? Object.values(reviewsObj) : [];

  useEffect(() => {
    if (!reviewsObj) {
      dispatch(getAllReviews(productId));
    }
  }, [dispatch, productId, reviewsObj]);

  if (!reviewsObj) return <h2>Loading...</h2>;

  const handleDelete = (reviewId) => {
     setModalContent(<DeleteReview onDelete={() => deleteConfirm(reviewId, productId)} onClose={() => closeModal()}/>)
  }

  const deleteConfirm = async (reviewId, productId) => {
    await dispatch(deleteReview(reviewId, productId, sellerId))
    closeModal()
  }

  return (
    <div>
      {reviews.map((review) => (
        <div key={review?.id} className="review-container">
          <div className="review-header">
            <Stars rating={review.stars} />
            {review.recommendation && (
              <p className="recommendation">
                <FaCheck id="check-icon" /> <p className="rec-text">Recommends this item</p>
              </p>
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
                className={`${review.user !== user ? "hidden" : "delete-review"}`} 
                onClick={() => handleDelete(review.id)}>
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
