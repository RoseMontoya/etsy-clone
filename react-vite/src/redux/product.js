import { productDeletedCart } from "./cart";
import { productDeletedFav } from "./favorite";

const GET_PRODUCTS = "product/getProducts";
const PRODUCT_BY_ID = "product/getProductById";
const PRODUCT_BY_CURRENT_USER = "product/getProductByCurrentUser";
const CREATE_PRODUCT = "product/createProduct";
const UPDATE_PRODUCT = "product/updateProduct";
const DELETE_PRODUCT = "product/removeProduct";
const CREATE_IMAGE = "image/createImage";
const UPDATE_IMAGE = "image/updateImage";
const DELETE_IMAGE = "image/deleteImage";
const CLEAR_CURRENT = "products/clearCurrent";

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

export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

export const reviewChange = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/products`);

  if (response.ok) {
    const products = await response.json();
    products.forEach(async (product) => {
      await dispatch(updateProduct(product));
    });
  }
};

export const thunkAllProducts = () => async (dispatch) => {
  // console.time('allProducts')
  // const fetches = [fetch("/api/products/"), fetch("/api/users/"), fetch('/api/reviews'), fetch('/api/products/preview-images')];
  // const responses = await Promise.all(fetches)
  // // const response = await fetch('/api/reviews')

  // // console.log('response', response)
  // for (const response of responses) {
  //   console.log(response.json())
  //   if (!response.ok) {
  //     console.error("Fetch failed:", response);
  //     return response
  //   }
  // }

  //   // const json = responses.map(res => res.json())

  //   // const data = await Promise.all(responses.map(res => res.json()))
  //   const data = await Promise.all(responses.map(res => res.json()));
  //   console.log('data', data)
  //   dispatch(getProducts(data));
  // console.time("allProducts");
  const fetches = [
    fetch("/api/products/"),
    fetch("/api/users/"),
    fetch("/api/reviews"),
    fetch("/api/products/preview-images"),
  ];

  // Wait for all fetches to complete
  const responses = await Promise.all(fetches);

  // Check for any non-ok responses before proceeding
  for (const response of responses) {
    console.log('Response',response)
    if (!response.ok) {
      console.error("Fetch failed:", response);
      return response;
    }
  }

  // Convert all responses to JSON
  const data = await Promise.all(responses.map((res) => res.json()));


  // Set up Seller details
  const sellers = {};
  data[1].forEach((seller) => (sellers[seller.id] = seller));

  const review_stats = {};
  data[2].forEach((stat) => (review_stats[stat.product_id] = stat));
  const stat_totals = {};

  for (const product of data[0]) {
    for (const image of data[3]) {
      if (image.product_id === product.id) {
        product.preview_image = image.url;
        break;
      }
    }

    if (review_stats[product.id]) {
      if (stat_totals[product.seller_id]) {
        stat_totals[product.seller_id].stars_total +=
          review_stats[product.id].stars_total;
        stat_totals[product.seller_id].review_count +=
          review_stats[product.id].review_count;
      } else {
        stat_totals[product.seller_id] = {
          stars_total: review_stats[product.id].stars_total,
          review_count: review_stats[product.id].review_count,
        };
      }
    }
  }

  for (const [id, seller] of Object.entries(sellers)) {

    if (stat_totals[id]) {
      seller["seller_rating"] = +(
        stat_totals[id].stars_total / stat_totals[id].review_count
      ).toFixed(1);
      seller["review_count"] = stat_totals[id].review_count;
    } else {
      seller["avg_rating"] = "No Reviews";
      seller["review_count"] = 0;
    }
  }

  for (const product of data[0]) {
    if (sellers[product.seller_id]) {
      product["seller"] = sellers[product.seller_id];
    }
  }

  dispatch(getProducts(data[0]));
  return data[0]
};

export const thunkRandomProduct = () => async (dispatch) => {
  // const response = await fetch(`/api/products/random`);

  // if (response.ok) {
  //   const data = await response.json();
  //   dispatch(getProductById(data));
  //   return data;
  // }
  // return response;
  const res = await fetch(`/api/products/random`);


  const product = await res.json()
  if (!res.ok) return product

  const fetches = [
    fetch(`/api/reviews/review-stats/${product.id}`),
    fetch(`/api/products/${product.id}/images`),
  ];

  // Wait for all fetches to complete
  const responses = await Promise.all(fetches);
  console.log(responses);

  // Check for any non-ok responses before proceeding
  for (const response of responses) {
    if (!response.ok) {
      const data = await response.json()
      console.error("Fetch failed:", data);
      return data;
    }
  }

  // Convert all responses to JSON
  const data = await Promise.all(responses.map((res) => res.json()));


  product.product_images = data[1];
  for (const image in data[1]) {
    if (data[1][image].preview) {
      product.preview_image = data[1][image].url;
    }
  }

  product.seller = {
    ...product.seller,
    seller_rating: data[0].stars_total
      ? +(data[0].stars_total / data[0].review_count).toFixed(0)
      : "No Reviews",
    review_count: data[0].review_count ? data[0].review_count : 0,
  };

  dispatch(getProductById(product));
  return product
};

export const productById = (productId) => async (dispatch) => {
  // const response = await fetch(`/api/products/${productId}`);
  // const data = await response.json();
  // if (response.ok) {
  //   dispatch(getProductById(data));
  //   return data;
  // }
  // return data;

  const fetches = [
    fetch(`/api/products/${productId}`),
    fetch(`/api/reviews/review-stats/${productId}`),
    fetch(`/api/products/${productId}/images`),
  ];

  // Wait for all fetches to complete
  const responses = await Promise.all(fetches);
  console.log(responses);

  // Check for any non-ok responses before proceeding
  for (const response of responses) {
    if (!response.ok) {
      const data = await response.json()
      console.error("Fetch failed:", data);
      return data;
    }
  }

  // Convert all responses to JSON
  const data = await Promise.all(responses.map((res) => res.json()));
  // console.log("thedata", data);
  const product = data[0];

  product.product_images = data[2];
  for (const image in data[2]) {
    if (data[2][image].preview) {
      product.preview_image = data[2][image].url;
    }
  }

  product.seller = {
    ...product.seller,
    seller_rating: data[1].stars_total
      ? +(data[1].stars_total / data[1].review_count).toFixed(1)
      : "No Reviews",
    review_count: data[1].review_count ? data[1].review_count : 0,
  };

  dispatch(getProductById(product));
  return product
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
export const deleteProduct = (productId, userId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      console.log({ thunkError: data.errors });
      return;
    }
    dispatch(removeProduct(productId));
    await dispatch(productDeletedFav(productId, userId));
    await dispatch(productDeletedCart(productId));
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
          [prodId]: {
            ...state.allProducts[prodId],
            ...action.payload,
            seller: {
              ...state.allProducts[prodId].seller,
              ...action.payload.seller,
            },
          },
        };
        newState["allProducts"] = newAllProducts;
      }
      // Updating productById;
      if (state.productById[prodId]) {
        const newProductById = {
          ...state.productById,

          [prodId]: {
            ...state.productById[prodId],
            ...action.payload,
            seller: {
              ...state.productById[prodId].seller,
              ...action.payload.seller,
            },
          },
        };
        newState["productById"] = newProductById;
      }

      // Update productsCurrent;
      if (state.productsCurrent) {
        const newProductsCurrent = {
          ...state.productsCurrent,
          [prodId]: {
            ...state.productsCurrent[prodId],
            ...action.payload,
            seller: {
              ...state.productsCurrent[prodId].seller,
              ...action.payload.seller,
            },
          },
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
        // Updating Image for productsCurrent
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
        delete newProductsCurrent[prodId];

        newState["productsCurrent"] = newProductsCurrent;
      }

      return { ...state, ...newState };
    }
    case CLEAR_CURRENT: {
      const newState = { ...state };
      delete newState.productsCurrent;
      return newState;
    }
    // }
    default:
      return state;
  }
}

export default productReducer;
