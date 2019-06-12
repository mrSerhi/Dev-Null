import { GET_POSTS, POST_LOADING } from "../actions/types";

const initState = {
  posts: [],
  post: {},
  loading: false
};

function postReducer(state = initState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    default:
      return state;
  }
}

export default postReducer;
