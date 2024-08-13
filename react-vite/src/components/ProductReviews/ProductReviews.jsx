import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../../redux/review";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ReviewFormModal from "../ReviewFormModal";
import './ProductReview.css'

function ProductReviews({ productId }) {
  const dispatch = useDispatch();
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

  return (
    <div>
      {reviews.map((review) => (
            <div key={review?.id}>
              <div>
                <p>{review.stars}</p>
                <p>{review.review}</p>
                <div>
                  <p>{review.user}</p>
                  <p>{review.updated_at}</p>
                </div>
              </div>
              <p>{review.recommendation ? "Recommends this item" : ""}</p>
              <div>
                <OpenModalMenuItem
                  className={`${review.user !== user? "hidden" : ""}`}
                  itemText="Edit Review"
                  modalComponent={
                    <ReviewFormModal
                      productId={productId}
                      formType={"edit"}
                      reviewId={review.id}
                    />
                  }
                />
                <OpenModalMenuItem
                  className={`${review.user !== user? "hidden" : ""}`}
                  itemText="Delete Review"
                  modalComponent={
                    <ReviewFormModal
                      productId={productId}
                      formType={"edit"}
                      reviewId={review.id}
                    />
                  }
                />
              </div>
            </div>
          ))
        }
    </div>
  );
}

export default ProductReviews;
