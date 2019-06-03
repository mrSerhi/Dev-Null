import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "./types";

// get current profile
function getCurrentProfileAction() {
  return dispatch => {
    // set to loading profile
    dispatch({
      type: PROFILE_LOADING
    });

    // get current profile and if user don't create profile yet -> set to {}
    axios
      .get("/api/profile")
      .then(res => {
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        });
      })
      .catch(() => {
        dispatch({
          type: GET_PROFILE,
          payload: {}
        });
      });
  };
}

// create of user profile action
function createProfileAction(usrData, history) {
  return dispatch => {
    axios
      .post("/api/profile", usrData)
      .then(() => history.push("/dashboard"))
      .catch(ex => {
        dispatch({
          type: GET_ERRORS,
          payload: ex.response.data
        });
      });
  };
}

const clearProfileAction = () => ({ type: CLEAR_CURRENT_PROFILE });

export { getCurrentProfileAction, clearProfileAction, createProfileAction };
