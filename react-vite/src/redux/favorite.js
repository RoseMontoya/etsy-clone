// Action types
const GET_FAV = "favorites/getFav";
const ADD_FAV = "favorites/addFav";
const REMOVE_FAV = "favorites/removeFav";
const PRODUCT_DELETED = 'favorites/productDeleted'
const CLEAR_FAVS = 'favorites/clearFavs'

// Action creator to get all favorites for a user
const getFav = (userId, favorites) => ({
  type: GET_FAV,
  payload: favorites,
  userId,
});

// Action creator to add a favorite
const addFav = (favorite) => ({
  type: ADD_FAV,
  payload: favorite,
});

// Action creator to remove a favorite
const removeFav = (favorite) => ({
  type: REMOVE_FAV,
  payload: favorite,
});

// Action creator to clear all favorites
export const clearFavs = () => ({
  type: CLEAR_FAVS
})

// Action creator to handle product deletion from favorites
export const productDeletedFav = (productId, userId) => ({
  type: PRODUCT_DELETED,
  productId,
  userId
})

// Thunk action to fetch all favorites by user ID
export const favoritesByUserId = (userId) => async (dispatch) => {
  const response = await fetch("/api/favorites/current");
  const data = await response.json();
  if (response.ok) {
    dispatch(getFav(userId, data));
    return data;
  }
  return data;
};

// Thunk action to add a favorite by product ID
export const addFavorite = (productId) => async (dispatch) => {
  const response = await fetch("/api/favorites/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(productId),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addFav(data));
    return data;
  }
  return response;
};

// Thunk action to remove a favorite by product ID
export const removeFavorite = (productId) => async (dispatch) => {
  const response = await fetch(`/api/favorites/${productId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(removeFav(data));
    return data;
  }
  return response;
};

// Initial state
const initialState = {};

// Favorites reducer
function favoriteReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FAV: {
      const newState = {};
      action.payload.forEach((fav) => {
        newState[fav.id] = fav;
      });
      // newState[action.userId] = action.payload;
      return { [action.userId]: newState };
    }
    case ADD_FAV: {
      const newState = { ...state[action.payload.user_id] };
      newState[action.payload.id] = action.payload;
      return { ...state, [action.payload.user_id]: newState };
    }
    case REMOVE_FAV: {
      const newState = { ...state[action.payload.user_id] };
      delete newState[action.payload.id];
      return { ...state, [action.payload.user_id]: newState };
    }
    case PRODUCT_DELETED: {
      const newState = {...state[action.userId]}
      const newStateArray = newState? Object.values(newState) : []
      if (newState) {
        newStateArray.forEach(fav => {
          if (fav.product_id === action.productId) {
            delete newState[fav.id]
          }
        })
      }
      return {...state, [action.userId] : newState}
    }
    case CLEAR_FAVS: {
      return {}
    }
    default:
      return state;
  }
}

export default favoriteReducer;
