const GET_CART = 'reviews/get-cart'

const getCart = (cart) => ({
    type: GET_CART,
    payload: cart
})

export const getAllCartItems = (cart) => async dispatch => {
    const response = await fetch(`/api/cart/`)

    console.log('RESPONSE ============>', response)

    if (response.ok) {
        const data = await response.json()
        console.log("IN THUNK =================>", data)
        dispatch(getCart(data))
        return data
    }

    const errors = await response.json()
    return errors
}

const initialState = {}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART: {
            const newState = {};
            action.payload.cart_items.forEach(cartItem => {
                newState[cartItem.id] = cartItem; // Ensure cartItem.id exists
            });
            return {
                ...state,
                cartItems: newState, // Update only the cart part of the state
            };
        }
        default:
            return state;
    }
};

export default cartReducer;