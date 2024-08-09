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
    console.log("PRODUCT DETAILS Thunk", data)
    if (response.ok) {
      dispatch(getProductById(data))
      return data
    }
    return data
}

const initialState = { allProducts: {}, productById: {}};

function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:{
      const newState = {}
      action.payload.map(product => {
        newState[product.id] = product
      })
      // console.log(newState);
      return { ...state, allProducts: newState };
    }
    case GET_PRODUCT_BY_ID: {
      console.log(state)
      const newState = {...state.productById}
      newState[action.payload.id] = action.payload
      return {...state, productById: newState}
    }
    default:
      return state;
  }
}

export default productReducer;
