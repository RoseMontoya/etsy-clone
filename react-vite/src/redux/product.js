const GET_PRODUCTS = "product/getProducts";
const PRODUCT_BY_ID = "product/getProductById";
const PRODUCT_BY_CURRENT_USER = "product/getProductByCurrentUser";
const CREATE_PRODUCT = "product/createProduct";
const DELETE_PRODUCT = "product/removeProduct";

const getProducts = (products) => ({
  type: GET_PRODUCTS,
  payload: products,
});

const getProductById = (product) => ({
  type: PRODUCT_BY_ID,
  payload: product,
});

const getProductByCurrentUser = (products) => ({
  type: PRODUCT_BY_CURRENT_USER,
  payload: products,
});

const createProduct = (product) => ({
  type: CREATE_PRODUCT,
  payload: product,
});

const removeProduct = (productId) => ({
  type: DELETE_PRODUCT,
  payload: productId,
});

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

export const productById = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`);
  const data = await response.json();
  if (response.ok) {
    dispatch(getProductById(data));
    return data;
  }
  return data;
};

// Get products owned by current user
export const productByUserId = () => async (dispatch) => {
  const response = await fetch(`/api/products/current`);
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      console.log({ thunkError: data.errors });
      return;
    }
    dispatch(getProductByCurrentUser(data));
  }
};

// Create product
export const addProduct = (product) => async (dispatch) => {
  const response = await fetch("/api/products/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const data = await response.json();
  console.log("data", data);
  if (response.ok) {
    dispatch(createProduct(data));
  } else if (!response.ok) {
    console.error("Failed to create product:", data);
  }
  return response;
};

// Delete product by ID
export const deleteProduct = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    console.log("data in delete product thunk ---->", data);
    if (data.errors) {
      console.log({ thunkError: data.errors });
      return;
    }
    dispatch(removeProduct(data));
  }
};

const initialState = { productById: {} };

function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS: {
      let newState = {};
      action.payload.forEach((product) => {
        newState[product.id] = product;
      });
      return { ...state, allProducts: newState };
    }
    case PRODUCT_BY_ID: {
      let newState = { ...state.productById };
      newState[action.payload.id] = action.payload;
      return { ...state, productById: newState };
    }
    case PRODUCT_BY_CURRENT_USER: {
      let newState = { ...state.productByUserId };
      newState = action.payload;
      return { ...state, productByUserId: newState };
    }
    case CREATE_PRODUCT: {
      let newState = {
        ...state,
        allProducts: {
          ...state.allProducts,
          [action.payload.id]: action.payload,
        },
      };
      return newState;
    }
    case DELETE_PRODUCT: {
      const newState = { ...state };
      delete newState.productByUserId[action.payload];
      delete newState.allProducts[action.payload];
      return newState;
    }
    default:
      return state;
  }
}

export default productReducer;
