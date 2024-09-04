// React Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux/Component Imports
import { createReview, editReview } from "../../redux";
import {Stars} from "../SubComponents";
import { useModal } from "../../context/Modal";

// Design Imports
import { IoMdClose } from "react-icons/io";
import "./ReviewFormModal.css";

function ReviewFormModal({ productId, formType, reviewId, sellerId }) {
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const [review, setReview] = useState(""); // State to store the review text
  const [rating, setRating] = useState(0); // State to store the star rating
  const [recommendation, setRecommendation] = useState(false); // State to store recommendation status
  const [errors, setErrors] = useState({}); // State to store validation errors
  const { closeModal } = useModal(); // Hook to manage modal state

  // if (rating < 3) setRecommendation(false)

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    setErrors({}); // Clear previous errors

    // Create a payload object with the current review details
    const payload = { productId, review, stars: rating, recommendation };

    // If editing, add the review ID to the payload
    if (reviewId) payload["id"] = reviewId;

    // Determine which Redux thunk to dispatch based on form type
    const thunkAction = formType === "create" ? createReview : editReview;

    // Dispatch the thunk action and handle errors if any
    dispatch(thunkAction(payload, sellerId)).then(async (res) => {
      if (res.status) {
        const errors = await res.json();
        setErrors(errors.errors);
      } else {
        closeModal();
      }
    });
  };

  // Selector to get the previous review if editing
  const prevRev = useSelector(
    (state) => state.reviews.reviewsByProdId?.[productId]?.[reviewId]
  );

  // Effect to set form fields if editing an existing review
  useEffect(() => {
    if (formType === "edit" && !rating) {
      setRating(prevRev.stars);
      setReview(prevRev.review);
      setRecommendation(prevRev.recommendation);
    }

    // Automatically uncheck recommendation if rating is below 3 stars
    if (rating < 3 && recommendation) setRecommendation(false)
  }, [formType, prevRev, rating, recommendation]);

  return (
    <>
      <div className="review-modal-container">
        <button
          className="close-modal-button"
          style={{ top: "0em", right: "0em", color: "black" }}
          onClick={() => closeModal()}
        >
          <IoMdClose />
        </button>
        {formType === "create" ? (
          <h2>Leave a review:</h2>
        ) : (
          <h2>Edit your review:</h2>
        )}
        <form onSubmit={handleSubmit}>
          {errors?.message && (
            <p className="error" style={{ margin: 0 }}>
              {errors.message}
            </p>
          )}
          <div>
            <div id="stars">
              <Stars rating={rating} onClick={setRating} />
              <p style={{ fontWeight: "700" }}>Stars</p>
            </div>

            {rating < 1 && (
              <p className="star-count">Please input a star rating.</p>
            )}

            {/* review */}
            <textarea
              placeholder="Leave your review here..."
              className="review-text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            {review.length < 10 && (
              <p className="char-count">
                Review text needs to be a minimum of 10 characters.
              </p>
            )}

            {/* recommendation */}

            {rating >= 3 ? (
              <div className="recommendation-container">
                <label>Would you recommend this product?</label>
                <input
                  type="checkbox"
                  checked={recommendation}
                  onChange={(e) => {
                    setRecommendation(e.target.checked);
                  }}
                />
              </div>
            ) : null}
          </div>

          {/* submit button */}
          <button
            className="submit-button"
            type="submit"
            disabled={review.length < 10 || rating < 1}
          >
            {formType === "create" ? "Submit Your Review" : "Update"}
          </button>
        </form>
      </div>
    </>
  );
}

export default ReviewFormModal;
