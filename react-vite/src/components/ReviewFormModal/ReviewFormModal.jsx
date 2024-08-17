import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { TiStarOutline } from "react-icons/ti";
// import { TiStarFullOutline } from "react-icons/ti";
import { createReview, editReview } from "../../redux/review";
import Stars from "../SubComponents/Stars";
import "./ReviewFormModal.css";

function ReviewFormModal({ productId, formType, reviewId, sellerId }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [recommendation, setRecommendation] = useState(false);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // if (rating < 3) setRecommendation(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const payload = { productId, review, stars: rating, recommendation };

    if (reviewId) payload["id"] = reviewId;

    const thunkAction = formType === "create" ? createReview : editReview;

    dispatch(thunkAction(payload, sellerId)).then(async (res) => {
      if (res.status) {
        const errors = await res.json();
        setErrors(errors.errors);
      } else {
        closeModal();
      }
    });
  };

  const prevRev = useSelector(
    (state) => state.reviews.reviewsByProdId?.[productId]?.[reviewId]
  );

  useEffect(() => {
    if (formType === "edit" && !review) {
      setRating(prevRev.stars);
      setReview(prevRev.review);
      setRecommendation(prevRev.recommendation);
    }
    if (rating < 3) setRecommendation(false)
  }, [formType, prevRev, rating]);

  return (
    <>
      <div className="review-modal-container">
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
              <p style={{ fontWeight: "700", padding: ".25em", paddingTop: 0 }}>
                Stars
              </p>
            </div>

                        {rating < 1 && (
                            <p className="star-count">
                                Please input a star rating.
                            </p>
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
                  // value={recommendation}
                  onChange={(e) => {
                    // e.target.value === "false" ? setRecommendation(false) : setRecommendation(true)
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
