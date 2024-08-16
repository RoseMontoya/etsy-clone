const GET_FAV = "favorites/getFav";
const ADD_FAV = "favorites/addFav";
const REMOVE_FAV = "favorites/removeFav";

const getFav = (userId, favorites) => ({
  type: GET_FAV,
  payload: favorites,
  userId,
});

const addFav = (favorite) => ({
  type: ADD_FAV,
  payload: favorite,
});

const removeFav = (favorite) => ({
  type: REMOVE_FAV,
  payload: favorite,
});

export const favoritesByUserId = (userId) => async (dispatch) => {
  const response = await fetch("/api/favorites/current");
  const data = await response.json();
  if (response.ok) {
    console.log('GET FAV', data)
    dispatch(getFav(userId, data));
    return data;
  }
  return data;
};

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

const initialState = {};

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
    default:
      return state;
  }
}

export default favoriteReducer;
