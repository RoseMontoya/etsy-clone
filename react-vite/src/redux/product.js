const GET_PRODUCTS = "product/getProducts";
const PRODUCT_BY_ID = "product/getProductById";
const PRODUCT_BY_CURRENT_USER = "product/getProductByCurrentUser";
const CREATE_PRODUCT = "product/createProduct";
const UPDATE_PRODUCT = "product/updateProduct";
const DELETE_PRODUCT = "product/removeProduct";
const CREATE_IMAGE = "image/createImage";
// const UPDATE_IMAGE = "image/updateImage";

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

const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  payload: product,
});

const removeProduct = (productId) => ({
  type: DELETE_PRODUCT,
  payload: productId,
});

const createImage = (product) => {
  return {
    type: CREATE_IMAGE,
    payload: product,
  };
};

// const updateImage = (image) => {
//   return {
//     type: UPDATE_IMAGE,
//     payload: image,
//   };
// };

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
export const addProductImage = (image) => async (dispatch) => {
  const { product_id, url, preview } = image;
  const response = await fetch("/api/products/images/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_id, url, preview }),
  });
  if (response.ok) {
    const newImage = await response.json();
    dispatch(createImage(newImage));
    return newImage;
  } else {
    const error = await response.json();
    return error;
  }
};

// Update Product Images
// export const updateProductImage = (image) => async (dispatch) => {
//   console.log("image in thunk ------>", image);

//   const { id, url } = image;
//   const response = await fetch(`/api/products/images/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ url }),
//   });

//   if (response.ok) {
//     const updatedImage = await response.json();
//     dispatch(updateImage(updatedImage));
//     return updatedImage;
//   } else {
//     const error = await response.json();
//     return error;
//   }
// };

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
      const newState = { ...state };
      const productId = action.payload.product_id;

      if (newState.productById[productId]) {
        newState.productById[productId] = {
          ...newState.productById[productId],
          product_images: [
            ...newState.productById[productId].product_images,
            action.payload,
          ],
        };
      }
      return newState;
    }
    // case UPDATE_IMAGE: {
    //   const newState = { ...state };
    //   const productId = action.payload.product_id;

    //   if (newState.productById[productId]) {
    //     const updatedImages = newState.productById[
    //       productId
    //     ].product_images.map((image) =>
    //       // if there's an image, action.payload, else, new image
    //       image.id === action.payload.id ? action.payload : image
    //     );
    //     newState.productById[productId] = {
    //       ...newState.productById[productId],
    //       product_images: updatedImages,
    //     };
    //   }
    //   return newState;
    // }
    case DELETE_PRODUCT: {
      const newState = { ...state };
      delete newState.productByUserId[action.payload];
      return newState;
    }
    default:
      return state;
  }
}

export default productReducer;
