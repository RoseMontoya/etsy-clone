const GET_REVIEWS = 'reviews/get-reviews'
const CREATE_REVIEW = 'reviews/create-review'
const UPDATE_REVIEW = 'reviews/update-review'
const DELETE_REVIEW = 'reviews/delete-review'

const getReviews = (reviews, productId) => ({
    type: GET_REVIEWS,
    payload: reviews,
    productId
})

const addReview = (review) => ({
    type: CREATE_REVIEW,
    payload: review
})

const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    payload: review
})

const removeReview = (reviewId, productId) => ({
    type: DELETE_REVIEW,
    payload: { reviewId, productId}
})

export const getAllReviews = (productId) => async dispatch => {
    const response = await fetch(`/api/products/${productId}/reviews`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getReviews(data, productId))
        return data
    }

    const errors = await response.json()
    return errors
}

export const createReview = (review) => async dispatch => {
    const response = await fetch(`/api/products/${review.productId}/reviews`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })

    if (response.ok){
        const data = await response.json()
        dispatch(addReview(data))
        return data
    }

    return response
}

export const editReview = (review) => async dispatch => {
    const response = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(updateReview(data))
        return data
    }

    return response
}

export const deleteReview = (reviewId, productId) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, { method: 'DELETE'})

    if (response.ok) {
        dispatch(removeReview(reviewId, productId))
        return await response.json()
    }
    return response
}

const initialState = {}

/*
    state: {
        reviews: {
            reviewByProdId:{
                1: {

                }
            }
        }
    }
*/
const reviewsReducer = ( state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS: {
            const newState = {}
            action.payload.forEach(review => {
                newState[review.id] = review
            })
            return {...state, reviewsByProdId: {[action.productId]: newState}}
        }
        case CREATE_REVIEW: {
            const productId = action.payload.product_id
            const newState = {...state.reviewsByProdId}
            newState[productId] = {...newState[productId], [action.payload.id]: action.payload}
            return {...state, reviewsByProdId: newState}
        }
        case UPDATE_REVIEW: {
            const newState = {...state.reviewsByProdId[action.payload.product_id]}
            newState[action.payload.id] = action.payload
            return {...state, reviewsByProdId: {...state.reviewsByProdId, [action.payload.product_id]: newState}}
        }
        case DELETE_REVIEW: {
            const {reviewId, productId} = action.payload
            const newState = {...state.reviewsByProdId[productId]}
            delete newState[reviewId]
            return {...state, reviewsByProdId: {...state.reviewsByProdId, [productId]: newState}}
        }
        default:
            return state;
    }
}

export default reviewsReducer
