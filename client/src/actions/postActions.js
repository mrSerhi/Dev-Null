import axios from "axios";
import {
  GET_POSTS,
  POST_LOADING,
  GET_ERRORS,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  UPDATE_LIKE
} from "./types";

// get all posts
export function getPostsAction() {
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
          payload: null
        })
      );
  };
}

// add post
export function addPostAction(post) {
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
            payload: ex.response.data
          })
        );
    }
  };
}

// delete post
export function deletePostAction(postId) {
  return dispatch => {
    if (postId) {
      axios
        .delete(`/api/posts/${postId}`)
        .then(() => dispatch({ type: DELETE_POST, payload: postId }))
        .catch(ex => dispatch({ type: GET_ERRORS, payload: ex.response.data }));
    }
  };
}

// add like post
export function addLikeToPostAction(postID) {
  return dispatch => {
    axios
      .post(`/api/posts/like/${postID}`)
      .then(() => {
        // get currently updated post
        axios
          .get(`/api/posts/${postID}`)
          .then(res => dispatch({ type: UPDATE_LIKE, payload: res.data }));
      })
      .catch(ex => dispatch({ type: GET_ERRORS, payload: ex.response.data }));
  };
}

// remove like from post
export function removeLikeFromPostAction(postID) {
  return dispatch => {
    axios
      .post(`/api/posts/unlike/${postID}`)
      .then(() => {
        // get currently updated post
        axios
          .get(`/api/posts/${postID}`)
          .then(res => dispatch({ type: UPDATE_LIKE, payload: res.data }));
      })
      .catch(ex => dispatch({ type: GET_ERRORS, payload: ex.response.data }));
  };
}
