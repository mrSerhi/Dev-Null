import axios from "axios";

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";

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

const clearProfileAction = () => ({ type: CLEAR_CURRENT_PROFILE });

export { getCurrentProfileAction, clearProfileAction };
