const GET_FAVORITES = "favorites/getFavorites";

const getFavorites = (userId, favorites) => ({
  type: GET_FAVORITES,
  payload: favorites,
  userId,
});

export const favoritesByUserId = (userId) => async (dispatch) => {
  const response = await fetch("/api/favorites/current");
  const data = await response.json();
  if (response.ok) {
    dispatch(getFavorites(userId, data));
    return data;
  }
  return data;
};

const initialState = {};

function favoriteReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FAVORITES: {
      const newState = {};
      newState[action.userId] = action.payload;
      return newState;
    }
    default:
      return state;
  }
}

export default favoriteReducer;
