const GET_PRODUCTS = "product/getProducts";

const getProducts = (products) => ({
  type: GET_PRODUCTS,
  payload: products,
});

export const thunkAllProducts = () => async (dispatch) => {
  const response = await fetch("/api/product");
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      console.log({ thunkError: data.errors });
      return;
    }
    dispatch(getProducts(data));
  }
};

const initialState = { products: [] };

function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      console.log(action.payload);
      return { ...state, allProducts: action.payload };
    default:
      return state;
  }
}

export default productReducer;
