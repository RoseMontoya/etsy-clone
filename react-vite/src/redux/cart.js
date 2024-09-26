// Action types
const GET_CART = "cart/get-cart";
const DELETE_ALLCART = "cart/delete-cart";
const DELETE_CART_ITEM = "cart/detelet-cart-item";
const ADD_TO_CART = "cart/add-to-cart";
const EDIT_QUANTITY_ITEM = "cart/edit-quantity-item";
const PRODUCT_DELETED = "cart/product-deleted";

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

//Action for edit item quantity
const editItemQuantity = (cartItemId, quantity) => ({
  type: EDIT_QUANTITY_ITEM,
  payload: { cartItemId, quantity },
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

// Action to handle when a product is deleted from the inventory
export const productDeletedCart = (productId) => ({
  type: PRODUCT_DELETED,
  productId,
});

// Thunk action to delete a cart item by its ID
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

// Thunk action to update the quantity of a cart item
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
      dispatch(editItemQuantity(cartItemId, quantity));
    } else {
      const errors = await response.json();
      return errors;
    }
};

// Thunk action to add a product to the cart
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

// Thunk action to clear all items from the cart
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

// Thunk action to get all cart items for the current user
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

// Initial state
const initialState = {};

// Reducer
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
      delete newState[action.payload];
      return { ...state, cartItems: newState };
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
      const newState = { ...state.cartItems };
      const newStateArray = newState ? Object.values(newState) : [];
      if (newState) {
        newStateArray.forEach((item) => {
          if (item.product_id === action.productId) {
            delete newState[item.id];
          }
        });
      }

      return { ...state, cartItems: newState };
    }

    default:
      return state;
  }
};

export default cartReducer;
