import {
  GET_POSTS,
  POST_LOADING,
  ADD_POST,
  DELETE_POST
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
    default:
      return state;
  }
}

export default postReducer;
