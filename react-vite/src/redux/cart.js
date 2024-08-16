
const GET_CART = "cart/get-cart";
const DELETE_ALLCART = "cart/delete-cart";
const DELETE_CART_ITEM = "cart/detelet-cart-item";
const ADD_TO_CART = "cart/add-to-cart";
const EDIT_QUANTITY_ITEM = "cart/edit-quantity-item";
const PRODUCT_DELETED = "cart/product-deleted"
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
export const deleteAllCartItemsAction = () => ({
  type: DELETE_ALLCART,
});


export const productDeletedCart = (productId) => ({
  type: PRODUCT_DELETED,
  productId
})

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

export const updateCartItemQuantity =
  (cartItemId, quantity) => async (dispatch) => {
    const response = await fetch(`/api/cart/${cartItemId}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });

    if (response.ok) {
      const updatedItem = await response.json();
      dispatch(editItemQuantity(cartItemId, quantity));
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

    if (response.ok) {
      const data = await response.json();
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

  if (response.ok) {
    const data = await response.json();
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
      const newState = { ...state.cartItems };
      delete newState[action.payload]
      return {...state, cartItems: newState};
    }
    case DELETE_ALLCART: {
      const newState = { ...state };
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
        existingItem.quantity = cartItem.quantity;
      } else {
        // Otherwise, add the new cart item
        newState.cartItems[cartItem.id] = cartItem;
      }

      return {
        ...newState,
        cartItems: { ...newState.cartItems },
      };
    }
    case EDIT_QUANTITY_ITEM: {
      const { cartItemId, quantity } = action.payload;
      const newState = { ...state };

      if (newState.cartItems[cartItemId]) {
        newState.cartItems[cartItemId].quantity = quantity;
      }

      return {
        ...newState,
        cartItems: { ...newState.cartItems },
      };
    }
    case PRODUCT_DELETED: {
      const newState = {...state.cartItems}
      const newStateArray = newState? Object.values(newState) : []
      if (newState) {
        newStateArray.forEach(item => {
          if (item.product_id === action.productId) {
            delete newState[item.id]

          }
        })
      }

      return {...state, cartItems: newState}
    }

    default:
      return state;
  }
};

export default cartReducer;
