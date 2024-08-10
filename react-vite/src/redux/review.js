const GET_REVIEWS = 'reviews/get-reviews'

const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    payload: reviews
})

export const getAllReviews = (productId) => async dispatch => {
    const response = await fetch(`/api/products/${productId}/reviews`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getReviews(data))
        return data
    }

    const errors = await response.json()
    return errors
}

const initialState = { allReviews: {}}
const reviewsReducer = ( state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS: {
            const newState = {}
            action.payload.forEach(review => {
                newState[review.id] = review
            })
            return {...state, allReviews: newState}
        }
        default:
            return state;
    }
}
