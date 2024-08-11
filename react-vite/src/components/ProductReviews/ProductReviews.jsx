import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllReviews } from "../../redux/review"

function ProductReviews({productId}) {
    const dispatch = useDispatch()
    const reviewsObj = useSelector(state => state.reviews.allReviews)

    const reviews = Object.values(reviewsObj)

    useEffect(() => {
        if (!reviews.length) {
            dispatch(getAllReviews(productId))
        }
    }, [dispatch, productId])

    if (!reviews.length) return <h2>Loading...</h2>

    return (
        <div>
            {reviews.map(review => (
                <div key={review?.id}>
                    {review.review}
                </div>

            ))}
        </div>
    )
}

export default ProductReviews
