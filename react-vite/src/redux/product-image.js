const CREATE_IMAGE = "image/createImage";
const UPDATE_IMAGE = "image/updateImage";
const DELETE_IMAGE = "image/deleteImage";

const createImage = (product) => {
    return {
      type: CREATE_IMAGE,
      payload: product,
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
      payload: image
    }
  }

// Add Image Thunk
export const addProductImage = (image) => async (dispatch) => {
    const { product_id, url, preview } = image;
    const response = await fetch("/api/products/images/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(image),
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
  export const updateProductImage = (image) => async (dispatch) => {
    console.log("image in thunk ------>", image);

    const { id, url } = image;
    const response = await fetch(`/api/products/images/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (response.ok) {
      const updatedImage = await response.json();
      dispatch(updateImage(updatedImage));
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
