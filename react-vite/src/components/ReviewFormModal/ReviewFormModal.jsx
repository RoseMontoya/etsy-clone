import {useModal} from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import { createReview, editReview } from '../../redux/review';
import Stars from '../Star/Stars'


function ReviewFormModal({productId, formType, reviewId}) {
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

        dispatch(thunkAction(payload))
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
            <div>
                {formType === 'create' ? <h2>Leave a review:</h2> : <h2>Edit your review:</h2>}
                <form onSubmit={handleSubmit}>
                    {errors?.message && <p className='error' style={{margin: 0 }}>{errors.message}</p>}
                    <div>
                        <div id='stars'>
                        {/* <div
                            onClick={() => setRating(1)}
                            className='star'
                        >
                            {rating >= 1? <TiStarFullOutline/> : <TiStarOutline/>}
                        </div>
                        <div
                            onClick={() => setRating(2)}
                            className='star'
                        >
                            {rating >= 2? <TiStarFullOutline/> : <TiStarOutline/>}
                        </div>
                        <div
                            onClick={() => setRating(3)}
                            className='star'
                        >
                            {rating >= 3? <TiStarFullOutline/> : <TiStarOutline/>}
                        </div>
                        <div
                            onClick={() => setRating(4)}
                            className='star'
                        >
                            {rating >= 4? <TiStarFullOutline/> : <TiStarOutline/>}
                        </div>
                        <div
                            onClick={() => setRating(5)}
                            className='star'
                        >
                            {rating >= 5? <TiStarFullOutline/> : <TiStarOutline/>}
                        </div> */}
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
                        <div>
                            <label>Would you recommend this product?</label>
                            <input type='checkbox'
                            checked={recommendation}
                            // value={recommendation}
                            onChange={(e) =>
                                {
                                    // e.target.value === "false" ? setRecommendation(false) : setRecommendation(true)
                                    setRecommendation(e.target.checked)
                                    // console.log("this is e =======>", e.target.checked)
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
