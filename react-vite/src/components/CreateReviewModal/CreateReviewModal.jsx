import {useModal} from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import { createReview } from '../../redux/review';

function CreateReviewModal({productId}) {
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

        // console.log("PAYLOAD --------------->", payload)

        dispatch(createReview(payload))
        .then(async(res) => {
            if(res.status) {
                const errors = await res.json()
                console.log("ERRORS ================>", errors)
                setErrors(errors)
            } else {
                closeModal()
            }
        })
    }

    // console.log("recommendation ------->", recommendation)

    return (
        <>
            <div>
                <h2>Leave a review:</h2>
                <form onSubmit={handleSubmit}>
                    {errors?.message && <p className='error' style={{margin: 0 }}>{errors.message}</p>}
                    <div>
                        {/* stars */}
                        <div id='stars'>
                            <div
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
                        </div>
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
                            // checked={recommendation}
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
                        Submit Your Review
                    </button>
                </form>
            </div>
        </>
    )
}

export default CreateReviewModal;