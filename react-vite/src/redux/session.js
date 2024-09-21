import { deleteAllCartItemsAction } from "./cart";
import { clearCurrent } from "./product";
import { clearFavs } from "./favorite";

// Action types
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

// Action creator for setting user
const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

// Action creator for removing user
const removeUser = () => ({
  type: REMOVE_USER,
});

// Thunk for authenticating user
export const thunkAuthenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/");
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

// Thunk for logging in user
export const thunkLogin = (credentials) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

// Thunk for signing up a user
export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

// Thunk for logging out
export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
  dispatch(clearFavs());
  dispatch(deleteAllCartItemsAction());
  dispatch(clearCurrent());
};

// Initial state
const initialState = { user: null };

// Session reducer
function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;
