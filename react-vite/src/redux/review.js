const GET_REVIEWS = 'reviews/get-reviews'
const CREATE_REVIEW = 'reviews/create-review'

const getReviews = (reviews, productId) => ({
    type: GET_REVIEWS,
    payload: reviews, productId
})

const addReview = (review) => ({
    type: CREATE_REVIEW,
    payload: review
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

    // console.log("RESPONSE ===============>", response)

    return response
}

const initialState = {}
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
            console.log("PRODUCT ID =======================>", productId)
            const newState = {...state.reviewsByProdId}
            // console.log("ACTION PAYLOAD ================>", action.payload)
            // console.log("NEW STATE ================>", newState[action.payload.productId])
            newState[productId] = {...newState[productId], [action.payload.id]: action.payload}
            return {...state, reviewsByProdId: newState}
        }
        default:
            return state;
    }
}

export default reviewsReducer
