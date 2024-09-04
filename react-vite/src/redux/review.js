import { reviewChange } from "./product"

// Action types
const GET_REVIEWS = 'reviews/get-reviews'
const CREATE_REVIEW = 'reviews/create-review'
const UPDATE_REVIEW = 'reviews/update-review'
const DELETE_REVIEW = 'reviews/delete-review'

// Action creator to get reviews for a product
const getReviews = (reviews, productId) => ({
    type: GET_REVIEWS,
    payload: reviews,
    productId
})

// Action creator to create a review
const addReview = (review) => ({
    type: CREATE_REVIEW,
    payload: review
})

// Action creator to update a review
const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    payload: review
})

// Action creator to delete a review
const removeReview = (reviewId, productId) => ({
    type: DELETE_REVIEW,
    payload: { reviewId, productId}
})

// Thunk to get all reviews of a product
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

// Thunk to create a review
export const createReview = (review, sellerId) => async dispatch => {
    const response = await fetch(`/api/products/${review.productId}/reviews`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })

    if (response.ok){
        const data = await response.json()
        await dispatch(addReview(data))
        await dispatch(reviewChange(sellerId))
        return data
    }

    return response
}

// Thunk to edit a review
export const editReview = (review, sellerId) => async dispatch => {
    const response = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const data = await response.json()
        await dispatch(updateReview(data))
        await dispatch(reviewChange(sellerId))
        return data
    }

    return response
}

// Thunk to delete a review
export const deleteReview = (reviewId, productId, sellerId) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, { method: 'DELETE'})

    if (response.ok) {
        await dispatch(removeReview(reviewId, productId))
        await dispatch(reviewChange(sellerId))
        return await response.json()
    }
    return response
}

// Initial state
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

// Reviews reducer
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
