import axios from "axios";
import {
  GET_POSTS,
  POST_LOADING,
  GET_ERRORS,
  ADD_POST,
  DELETE_POST,
  GET_POST
} from "./types";

// get all posts
function getPostsAction() {
  return dispatch => {
    // set to loading post
    dispatch({
      type: POST_LOADING
    });

    axios
      .get("/api/posts")
      .then(res =>
        dispatch({
          type: GET_POSTS,
          payload: res.data
        })
      )
      .catch(() =>
        dispatch({
          type: GET_POSTS,
          payload: []
        })
      );
  };
}

// add post
function addPostAction(post) {
  return dispatch => {
    if (post) {
      axios
        .post("/api/posts", post)
        .then(res =>
          dispatch({
            type: ADD_POST,
            payload: res.data
          })
        )
        .catch(ex =>
          dispatch({
            type: GET_ERRORS,
            payload: ex.responce.data
          })
        );
    }
  };
}

export { getPostsAction, addPostAction };
