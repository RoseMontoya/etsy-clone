const GET_PRODUCTS = "product/getProducts";
const PRODUCT_BY_ID = 'product/getProductById';

const getProducts = (products) => ({
  type: GET_PRODUCTS,
  payload: products,
})

const getProductById = (product) => ({
  type: PRODUCT_BY_ID,
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
    // console.log('~~~~~~~~~~~', data)
    return data
}

const initialState = { productById: {}};

function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:{
      const newState = {}
      action.payload.forEach(product => {
        newState[product.id] = product
      })
      return { ...state, allProducts: newState };
    }
    case PRODUCT_BY_ID: {
      let newState = {...state.productById}
      newState[action.payload.id] = action.payload
      return {...state, productById: newState}
    }
    default:
      return state;
  }
}

export default productReducer;
