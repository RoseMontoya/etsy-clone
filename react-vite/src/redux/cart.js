const GET_CART = "reviews/get-cart";
const DELETE_ALLCART = "delete/all-cart";
const DELETE_CART_ITEM = "delete/cart-item";
const ADD_TO_CART = "cart/add-to-cart";

//Action to add 1 item in cart
const addToCartAction = (cartItem) => ({
  type: ADD_TO_CART,
  payload: cartItem,
});

//Action for get all cart
const getCart = (cart) => ({
  type: GET_CART,
  payload: cart,
});

// Action for deleting a single cart item
const deleteCartItemAction = (cartItemId) => ({
  type: DELETE_CART_ITEM,
  payload: cartItemId,
});

// Action for deleting all cart items
const deleteAllCartItemsAction = () => ({
  type: DELETE_ALLCART,
});

export const deleteCartItem = (cartItemId) => async (dispatch) => {
  const response = await fetch(`/api/cart/item/${cartItemId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteCartItemAction(cartItemId));
  } else {
    const errors = await response.json();
    return errors;
  }
};
export const addToCart =
  (productId, quantity = 1, gift = false, cartId = null) =>
  async (dispatch) => {
    const response = await fetch("/api/cart/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        product_id: productId,
        quantity: quantity,
        gift: gift,
        cart_id: cartId,
      }),
    });
    console.log(response, "This is addtoCart response");
    if (response.ok) {
      const data = await response.json();
      console.log(data, "do we get here");
      dispatch(addToCartAction(data)); // Dispatch the new cart item to update the state
      return data;
    } else {
      const errors = await response.json();
      return errors;
    }
  };

export const clearCart = () => async (dispatch) => {
  const response = await fetch(`/api/cart/clear`, {
    method: "DELETE",
    credentials: "include",
  });

  if (response.ok) {
    dispatch(deleteAllCartItemsAction());
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const getAllCartItems = () => async (dispatch) => {
  const response = await fetch(`/api/cart/`);

  //   console.log("RESPONSE ============>", response);

  if (response.ok) {
    const data = await response.json();
    // console.log("IN THUNK =================>", data);
    dispatch(getCart(data));
    return data;
  }

  const errors = await response.json();
  return errors;
};
const initialState = {};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART: {
      const newState = {};
      action.payload.cart_items.forEach((cartItem) => {
        newState[cartItem.id] = cartItem; // Ensure cartItem.id exists
      });
      return {
        ...state,
        cartItems: newState, // Update only the cart part of the state
      };
    }
    case DELETE_CART_ITEM: {
      const newState = { ...state };
      delete newState.cartItems[action.payload]; // Remove the specific cart item
      return newState;
    }
    case DELETE_ALLCART: {
      const newState = { ...state };
      console.log("in DeleteAllCart Reducer", newState);
      return {
        ...newState,
        cartItems: {}, // Clear all cart items
      };
    }
    case ADD_TO_CART: {
      const newState = { ...state };
      const cartItem = action.payload;
     
      // if (!cartItem || !cartItem.product_id) {
      //   console.error("Invalid cart item or missing product_id:", cartItem);

      //   //This is a note that we need to change the code later, no idea why we cannot access product_id
      //   //Technically if we remove the console.error, it works fine. returning state before it hit another error
      //   return state; // Early return to avoid further errors
      // }

      // Check if the product is already in the cart
      const existingItem = Object.values(newState.cartItems).find(
        (item) => item && item.product_id === cartItem.product_id
      );

      if (existingItem) {
        // If the product is already in the cart, increment the quantity
        existingItem.quantity += cartItem.quantity;
      } else {
        // Otherwise, add the new cart item
        newState.cartItems[cartItem.id] = cartItem;
      }

      return {
        ...newState,
        cartItems: { ...newState.cartItems },
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
