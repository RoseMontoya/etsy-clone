import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllReviews } from "../../redux/review"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import ReviewFormModal from "../ReviewFormModal"


function ProductReviews({productId}) {
    const dispatch = useDispatch()
    const reviewsObj = useSelector(state => state.reviews.reviewsByProdId ?. [productId])

    const reviews = reviewsObj? Object.values(reviewsObj) : []

    useEffect(() => {
        if (!reviewsObj) {
            dispatch(getAllReviews(productId))
        }
    }, [dispatch, productId, reviewsObj])

    if (!reviewsObj) return <h2>Loading...</h2>



    return (
        <div>
            {reviews.length? reviews.map(review => (
                <div key={review?.id}>
                    <div>
                        <p>{review.stars}</p>
                        <p>{review.review}</p>
                        <div>
                            <p>{review.user}</p>
                            <p>{review.updated_at}</p>
                        </div>
                    </div>
                    <p>{review.recommendation? "Recommends this item": ""}</p>
                    <div>
                    <OpenModalMenuItem
                        className=""
                        itemText="Edit Review"
                        modalComponent={<ReviewFormModal productId={productId} formType={'edit'} reviewId={review.id}/>}
                    />
                    <OpenModalMenuItem
                        className=""
                        itemText="Delete Review"
                        modalComponent={<ReviewFormModal productId={productId} formType={'edit'} reviewId={review.id}/>}
                    />
                    </div>
                </div>

            )): "Be the first to leave a review!"}
        </div>
    )
}

export default ProductReviews
