const GET_PRODUCTS = "product/getProducts";
const PRODUCT_BY_ID = "product/getProductById";
const PRODUCT_BY_CURRENT_USER = "product/getProductByCurrentUser";
const CREATE_PRODUCT = "product/createProduct";
const UPDATE_PRODUCT = "product/updateProduct";
const DELETE_PRODUCT = "product/removeProduct";
const CREATE_IMAGE = "image/createImage";
const UPDATE_IMAGE = "image/updateImage";
const DELETE_IMAGE = "image/deleteImage";
const UPDATE_INVENTORY = "product/updateInventory";

const getProducts = (products) => ({
  type: GET_PRODUCTS,
  payload: products,
});

const getProductById = (product) => ({
  type: PRODUCT_BY_ID,
  payload: product,
});

const getProductByCurrentUser = (products, user_id) => ({
  type: PRODUCT_BY_CURRENT_USER,
  payload: products,
  user_id
});

const createProduct = (product) => ({
  type: CREATE_PRODUCT,
  payload: product,
});

const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  payload: product,
});

const removeProduct = (productId) => ({
  type: DELETE_PRODUCT,
  payload: productId,
});

const createImage = (product, userId) => {
  return {
    type: CREATE_IMAGE,
    payload: product,
    userId
  };
};

const updateImage = (image) => {
  return {
    type: UPDATE_IMAGE,
    payload: image,
  };
};

const deleteImage = (image) => {
  return {
    type: DELETE_IMAGE,
    payload: image,
  }
}

const inventoryUpdate = (productId, quantity) => {
  return {
    type: UPDATE_INVENTORY,
    payload: {productId, quantity}
  }
}

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

export const thunkRandomProduct = () => async (dispatch) => {
  const response = await fetch(`/api/products/random`)

  if (response.ok) {
    const data = await response.json()
    dispatch(getProductById(data))
    return data
  }
  return response
}

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
    dispatch(getProductByCurrentUser(data.products, data.user_id));
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
  if (response.ok) {
    dispatch(createProduct(data));
    return data;
  } else if (!response.ok) {
    console.error("Failed to create product:", data);
  }
  return response;
};

// Update product
export const editProduct = (product) => async (dispatch) => {
  const response = await fetch(`/api/products/${product.id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(updateProduct(data));
    return data;
  } else if (!response.ok) {
    console.error("Failed to update product:", data);
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

// Add Image Thunk
export const addProductImage = (image, userId) => async (dispatch) => {
  const { product_id, url, preview } = image;
  const response = await fetch("/api/products/images/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(image),
  });
  if (response.ok) {
    const newImage = await response.json();
    dispatch(createImage(newImage, userId));
    return newImage;
  } else {
    const error = await response.json();
    return error;
  }
};

// Update Product Images
export const updateProductImage = (image, userId) => async (dispatch) => {
  console.log("image in thunk ------>", image);

  const { id, url } = image;
  const response = await fetch(`/api/products/images/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(image),
  });

  if (response.ok) {
    const updatedImage = await response.json();
    dispatch(updateImage(updatedImage, userId));
    return updatedImage;
  } else {
    const error = await response.json();
    return error;
  }
};

export const deleteProductImage = (image) => async dispatch => {
  const response = await fetch(`/api/products/images/${image.id}`, {method: 'DELETE'})

  if (response.ok) {
    const data = await response.json()
    dispatch(deleteImage(image))
    return data
  }
  return response
}

// Update inventory thunk
export const updateInventory = () => async dispatch => {
  const response = await fetch(`/api/products/successful-transaction`, {
    method: "PUT",
  });

  if (response.ok) {
    const data = await response.json();
    // console.log("DATA AFTER THUNK ======================>", data);
    return data;
  }
  return response;
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
      let newState = {};
      action.payload.forEach(prod => {
        newState[prod.id] = prod
      })
      return { ...state, productByUserId: {...action.payload.productByUserId, [action.user_id]: newState} };
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
    case UPDATE_PRODUCT: {
      let newState = {
        ...state,
        allProducts: {
          ...state.allProducts,
          [action.payload.id]: action.payload,
        },
      };
      return newState;
    }
    case CREATE_IMAGE: {
      const prodId = action.payload.product_id
      const id = action.payload.id

      const newProductById = { ...state.productById, [prodId]: state.productById[prodId] };
      newProductById[prodId].product_images[id] = action.payload
      newProductById[prodId].preview_image = action.payload.url

      const newState = {...state.allProducts}
      const newProductByUserId = {...state.productByUserId, [action.payloaduserId]: state.productByUserId[action.payload.userId]}
      if (action.payload.preview)
        newProductByUserId[prodId].preview_image = action.payload.url
        newState[prodId].preview_image = action.payload.url

      return {allProducts: newState, ProductById: newProductById, productByUserId: newProductByUserId };
    }
    case UPDATE_IMAGE: {
      const prodId = action.payload.product_id
      const id = action.payload.id

      const newProductById = { ...state.productById, [prodId]: state.productById[prodId] };
      console.log('newProductById Before', newProductById)
      newProductById[prodId].product_images[id] = action.payload
      newProductById[prodId].preview_image = action.payload.url
      console.log('newProductById After', newProductById)


      const newState = {...state.allProducts}
      console.log('newState Before', newState)
      console.log('state.productByUserId Before', state.productByUserId)
      const newProductByUserId = {...state.productByUserId, [action.payload.userId]: state.productByUserId[action.payload.userId]}
      console.log('newProductByUserId Before', newProductByUserId)


      if (action.payload.preview)
        newProductByUserId[prodId].preview_image = action.payload.url
        newState[prodId].preview_image = action.payload.url
        console.log('newState After', newState)
        console.log('newProductByUserId After', newProductByUserId)


      return {allProducts: newState, ProductById: newProductById, productByUserId: newProductByUserId };
    }
    case DELETE_IMAGE: {
      const prodId = action.payload.product_id
      const id = action.payload.id

      const newProductById = { ...state.productById, [prodId]: state.productById[prodId]};
      delete newProductById[prodId].product_images[id]
      return {...state, productById: newProductById}
    }
    case DELETE_PRODUCT: {
      const newState = { ...state };
      delete newState.productByUserId[action.payload];
      return newState;
    }
    case UPDATE_INVENTORY: {
      // const newState = { ...state, allProducts: {...state.allProducts}, productById: {...state.productById}, productByUserId: {...state.productByUserId} };
      const newState = {...state}
      console.log("NEW STATE =====================>", newState)
      const { productId, quantity } = action.payload;

      // Check if the product exists in `allProducts`
      if (newState.allProducts && newState.allProducts[productId]) {
        // Update the inventory of the product
        newState.allProducts[productId].inventory -= quantity;
      }

      // Check if the product exists in `productById`
      if (newState.productById && newState.productById[productId]) {
        // Update the inventory of the product
        newState.productById[productId].inventory -= quantity;
      }

      // Check if the product exists in `productByUserId`
      if (newState.productByUserId) {
        Object.keys(newState.productByUserId).forEach((userId) => {
          if (newState.productByUserId[userId][productId]) {
            newState.productByUserId[userId][productId].inventory -= quantity;
          }
        });
      }

      console.log("AFTER CHANGES =====================>", newState)
      return newState;
    }

    default:
      return state;
  }
}

export default productReducer;
