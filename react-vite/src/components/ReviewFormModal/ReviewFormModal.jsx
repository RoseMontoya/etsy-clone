import {useModal} from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// import { TiStarOutline } from "react-icons/ti";
// import { TiStarFullOutline } from "react-icons/ti";
import { createReview, editReview } from '../../redux/review';
import Stars from '../SubComponents/Stars';
import "./ReviewFormModal.css";


function ReviewFormModal({productId, formType, reviewId, sellerId}) {
    const dispatch = useDispatch()
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)
    const [recommendation, setRecommendation] = useState(false)
    const [errors, setErrors] = useState({})
    const {closeModal} = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrors({})

        const payload = {productId, review, stars: rating, recommendation}

        if (reviewId) payload['id'] = reviewId

        const thunkAction = formType === 'create'? createReview : editReview

        dispatch(thunkAction(payload, sellerId))
        .then(async(res) => {
            if(res.status) {
                const errors = await res.json()
                setErrors(errors.errors)
            } else {
                closeModal()
            }
        })
    }

    const prevRev = useSelector(state => state.reviews.reviewsByProdId?.[productId]?.[reviewId])

    useEffect(() => {
        if (formType === 'edit') {
            setRating(prevRev.stars)
            setReview(prevRev.review)
            setRecommendation(prevRev.recommendation)
        }
    }, [formType, prevRev])


    return (
        <>
            <div className="review-modal-container">
                {formType === 'create' ? <h2>Leave a review:</h2> : <h2>Edit your review:</h2>}
                <form onSubmit={handleSubmit}>
                    {errors?.message && <p className='error' style={{margin: 0 }}>{errors.message}</p>}
                    <div>
                        <div id='stars'>
                        <Stars rating={rating} onClick={setRating}/>
                            <p style={{fontWeight: '700', padding: '.25em', paddingTop: 0}}>Stars</p>
                        </div>

                        {/* review */}
                        <textarea
                            placeholder="Leave your review here..."
                            className='review-text'
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />

                        {/* recommendation */}
                        <div className="recommendation-container">
                            <label>Would you recommend this product?</label>
                            <input type='checkbox'
                            checked={recommendation}
                            // value={recommendation}
                            onChange={(e) =>
                                {
                                    // e.target.value === "false" ? setRecommendation(false) : setRecommendation(true)
                                    setRecommendation(e.target.checked)

                                }
                            }
                            />
                        </div>
                    </div>

                    {/* submit button */}
                    <button className='submit-button' type="submit" disabled={review.length < 10 || rating < 1}>
                        {formType === 'create'? "Submit Your Review" : "Update"}
                    </button>
                </form>
            </div>
        </>
    )
}

export default ReviewFormModal;
