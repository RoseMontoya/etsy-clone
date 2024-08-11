const GET_PRODUCTS = "product/getProducts";
const GET_PRODUCT_BY_ID = 'product/getProductById';

const getProducts = (products) => ({
  type: GET_PRODUCTS,
  payload: products,
})

const getProductById = (product) => ({
  type: GET_PRODUCT_BY_ID,
  payload: product
})

export const thunkAllProducts = () => async (dispatch) => {
  const response = await fetch("/api/products");
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      console.log({ thunkError: data.errors });
      return;
    }
    dispatch(getProducts(data));
  }
};

export const productById = (productId) => async dispatch => {
    const response = await fetch(`/api/products/${productId}`)

    const data = await response.json()
    // console.log("PRODUCT DETAILS Thunk", data)
    if (response.ok) {
      dispatch(getProductById(data))
      return data
    }
    return data
}

const initialState = {};

function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:{
      const newState = {}
      action.payload.forEach(product => {
        newState[product.id] = product
      })
      return { ...state, allProducts: newState };
    }
    case GET_PRODUCT_BY_ID: {
      let newState = {...state}
      console.log('NEW STATE', newState)
      if (state.allProducts[action.payload.id]) {
        console.log('_______________', state.allProducts[action.payload.id] )
        const newProductState = {...state.allProducts, [action.payload.id]: [...state.allProducts[action.payload.id]]}
        newProductState[action.payload.id] = action.payload
        console.log(newProductState)
        newState.allProducts = newProductState
      } else {
        newState.allProducts[action.payload.id] = action.payload
      }
      console.log('mod new state', newState)
      return newState
    }
    default:
      return state;
  }
}

export default productReducer;
