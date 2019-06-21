import {
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  ADD_POST,
  DELETE_POST,
  UPDATE_LIKE
} from "../actions/types";

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
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(p => p._id !== action.payload)
      };
    case UPDATE_LIKE:
      const index = state.posts.findIndex(p => p._id === action.payload._id);
      state.posts[index] = action.payload;
      return {
        ...state,
        posts: state.posts
      };
    default:
      return state;
  }
}

export default postReducer;
