// authtenticated reducer
const initState = {
  isAuthenticated: false,
  user: {}
};

function authReducer(state = initState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default authReducer;
