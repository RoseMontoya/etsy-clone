const GET_PRODUCTS = "product/getProducts";
const PRODUCT_BY_ID = "product/getProductById";
const PRODUCT_BY_CURRENT_USER = "product/getProductByCurrentUser";
const CREATE_PRODUCT = "product/createProduct";
const UPDATE_PRODUCT = "product/updateProduct";
const DELETE_PRODUCT = "product/removeProduct";
const CREATE_IMAGE = "image/createImage";
const UPDATE_IMAGE = "image/updateImage";
const DELETE_IMAGE = "image/deleteImage";

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
  user_id,
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
    userId,
  };
};

const updateImage = (image, userId) => {
  return {
    type: UPDATE_IMAGE,
    payload: image,
    userId,
  };
};

const deleteImage = (image) => {
  return {
    type: DELETE_IMAGE,
    payload: image,
  };
};

export const thunkAllProducts = () => async (dispatch) => {
  // console.time('allProducts')
  const response = await fetch("/api/products");
  // console.timeEnd('allProducts')

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
  const response = await fetch(`/api/products/random`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getProductById(data));
    return data;
  }
  return response;
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
    dispatch(removeProduct(productId));
  }
};

// Add Image Thunk
export const addProductImage = (image, userId) => async (dispatch) => {
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
  // console.log("image in thunk ------>", userId);

  const response = await fetch(`/api/products/images/${image.id}`, {
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

export const deleteProductImage = (image) => async (dispatch) => {
  const response = await fetch(`/api/products/images/${image.id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteImage(image));
    return data;
  }
  return response;
};

// Update inventory thunk
export const updateInventory = () => async (dispatch) => {
  const response = await fetch(`/api/products/successful-transaction`, {
    method: "PUT",
  });

  if (response.ok) {
    const data = await response.json();
    data.products.forEach((item) => {
      console.log("DATA AFTER THUNK ======================>", item);
      dispatch(updateProduct(item));
    });
    data.deleted_products.forEach((item) => {
      dispatch(removeProduct(item.id));
    });
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
      action.payload.forEach((prod) => {
        newState[prod.id] = prod;
      });
      return {
        ...state,
        productsCurrent: newState,
      };
    }
    case CREATE_PRODUCT: {
      const prodId = action.payload.id;
      const newState = {};
      // let newAllProducts;
      if (state.allProducts) {
        const newAllProducts = {
          ...state.allProducts,
          [prodId]: action.payload,
        };
        newState["allProducts"] = newAllProducts;
      }

      // let newProductById;
      if (state.productById[prodId]) {
        const newProductById = {
          ...state.productById,
          [prodId]: action.payload,
        };
        newState["productById"] = newProductById;
      }

      // let newProductCurrent;
      if (state.productsCurrent) {
        const newProductsCurrent = {
          ...state.productsCurrent,
          [prodId]: action.payload,
        };
        newState["productsCurrent"] = newProductsCurrent;
      }

      return { ...state, ...newState };
    }
    case UPDATE_PRODUCT: {
      const prodId = action.payload.id;
      const newState = {};

      // Update allProducts
      if (state.allProducts) {
        const newAllProducts = {
          ...state.allProducts,
          [prodId]: { ...state.allProducts[prodId], ...action.payload },
        };
        newState["allProducts"] = newAllProducts;
      }

      // Updating productById;
      if (state.productById[prodId]) {
        const newProductById = {
          ...state.productById,
          [prodId]: { ...state.productById[prodId], ...action.payload },
        };
        newState["productById"] = newProductById;
      }

      // Update productsCurrent;
      if (state.productsCurrent) {
        const newProductsCurrent = {
          ...state.productsCurrent,
          [prodId]: { ...state.productsCurrent[prodId], ...action.payload },
        };
        newState["productsCurrent"] = newProductsCurrent;
      }

      return { ...state, ...newState };
    }
    case CREATE_IMAGE: {
      const prodId = action.payload.product_id;
      const id = action.payload.id;
      const newState = {};

      if (state.productById[prodId]) {
        const newProductById = {
          ...state.productById,
          [prodId]: { ...state.productById[prodId] },
        };
        if (!newProductById[prodId].product_images) {
          newProductById[prodId].product_images = { [id]: action.payload };
        } else {
          newProductById[prodId].product_images = {
            ...state.productById[prodId].product_images,
            [id]: action.payload,
          };
        }

        newState["productById"] = newProductById;
      }

      if (action.payload.preview) {
        if (state.allProducts) {
          const newAllProducts = {
            ...state.allProducts,
            [prodId]: {
              ...state.allProducts[prodId],
              preview_image: action.payload.url,
            },
          };

          newState["allProducts"] = newAllProducts;
        }

        if (state.productsCurrent) {
          const newProductsCurrent = {
            ...state.productsCurrent,
            [prodId]: {
              ...state.productsCurrent[prodId],
              preview_image: action.payload.url,
            },
          };
          newState["productsCurrent"] = newProductsCurrent;
        }
      }

      return { ...state, ...newState };
    }
    case UPDATE_IMAGE: {
      const prodId = action.payload.product_id;
      const id = action.payload.id;
      const newState = {};

      // Update Images in productById
      if (state.productById[prodId]) {
        const newProductById = {
          ...state.productById,
          [prodId]: {
            ...state.productById[prodId],
            product_images: { ...state.productById[prodId].product_images },
          },
        };

        newProductById[prodId].product_images[id] = action.payload;
        if (action.payload.preview) {
          newProductById[prodId].preview_image = action.payload.url;
        }

        newState["productById"] = newProductById;
      }

      // allProducts and productsCurrent only need to be updated if image is preview image
      if (action.payload.preview) {
        // Update Image for allProducts
        if (state.allProducts) {
          const newAllProducts = {
            ...state.allProducts,
            [prodId]: {
              ...state.allProducts[prodId],
              preview_image: action.payload.url,
            },
          };

          newState["allProducts"] = newAllProducts;
        }
        console.log("this image is a preview");
        // Updating Image for productsCurrent
        if (state.productsCurrent) {
          console.log("inside productsCurrent", state.productsCurrent[prodId]);
          const newProductsCurrent = {
            ...state.productsCurrent,
            [prodId]: {
              ...state.productsCurrent[prodId],
              preview_image: action.payload.url,
            },
          };
          console.log("after", newProductsCurrent);
          newState["productsCurrent"] = newProductsCurrent;
        }
      }

      return { ...state, ...newState };
    }
    case DELETE_IMAGE: {
      const prodId = action.payload.product_id;
      const id = action.payload.id;
      const newState = {};

      // Update Images in productById
      if (state.productById[prodId]) {
        const newProductById = {
          ...state.productById,
          [prodId]: {
            ...state.productById[prodId],
            product_images: { ...state.productById[prodId].product_images },
          },
        };

        delete newProductById[prodId].product_images[id];

        newState["productById"] = newProductById;
      }

      return { ...state, ...newState };
    }
    case DELETE_PRODUCT: {
      const prodId = action.payload;
      const newState = {};
      console.log("PRODUCT ID", prodId);

      // Update allProducts
      if (state.allProducts) {
        const newAllProducts = {
          ...state.allProducts,
        };
        delete newAllProducts[prodId];
        newState["allProducts"] = newAllProducts;
      }

      // Updating productById;
      if (state.productById[prodId]) {
        const newProductById = {
          ...state.productById,
        };
        delete newProductById[prodId];
        newState["productById"] = newProductById;
      }

      // Update productsCurrent;
      if (state.productsCurrent) {
        const newProductsCurrent = {
          ...state.productsCurrent,
        };
        console.log("productCurrent before", newProductsCurrent);
        console.log("productCurrent", newProductsCurrent[prodId]);
        delete newProductsCurrent[prodId];

        newState["productsCurrent"] = newProductsCurrent;
      }

      return { ...state, ...newState };
    }

    default:
      return state;
  }
}

export default productReducer;
