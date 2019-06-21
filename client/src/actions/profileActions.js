import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_ALL_PROFILES
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

// delete profile && current user action
function deleteProfileAction() {
  return dispatch => {
    const confirm = window.confirm(
      "Your profile and account will be removed, are you sure?"
    );
    if (confirm) {
      axios
        .delete("/api/profile")
        .then(() => {
          // for removing we use SET_CURRENT_USER to set auth.user: {} like logoutUser action
          dispatch({
            type: SET_CURRENT_USER,
            payload: {}
          });
        })
        .catch(ex => {
          dispatch({
            type: GET_ERRORS,
            payload: ex.response.data
          });
        });
    }
  };
}

const clearProfileAction = () => ({ type: CLEAR_CURRENT_PROFILE });

// add experience to profile action
function addExperienceAction(userData, history) {
  return dispatch => {
    axios
      .post("/api/profile/experience", userData)
      .then(() => history.push("/dashboard"))
      .catch(ex => {
        dispatch({
          type: GET_ERRORS,
          payload: ex.response.data
        });
      });
  };
}

// remove experience from profile
function removeExperienceAction(expID) {
  return dispatch => {
    if (expID) {
      axios
        .delete("/api/profile/experience/" + expID)
        .then(res => {
          // call type of action -> should return back updated profile without removed exp
          dispatch({
            type: GET_PROFILE,
            payload: res.data
          });
        })
        .catch(ex => {
          dispatch({
            type: GET_ERRORS,
            payload: ex.response.data
          });
        });
    }
  };
}

// add education to profile action
function addEducationAction(userData, history) {
  return dispatch => {
    axios
      .post("/api/profile/education", userData)
      .then(() => history.push("/dashboard"))
      .catch(ex => {
        dispatch({
          type: GET_ERRORS,
          payload: ex.response.data
        });
      });
  };
}

// remove education from profile
function removeEducationAction(eduID) {
  return dispatch => {
    axios
      .delete("/api/profile/education/" + eduID)
      .then(res => {
        // get updated profile without removed education
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        });
      })
      .catch(ex => {
        dispatch({
          type: GET_ERRORS,
          payload: ex.response.data
        });
      });
  };
}

// get all profiles
function getProfilesAction() {
  return dispatch => {
    axios
      .get("/api/profile/all")
      .then(res => {
        // if OK -> returns array of profiles
        dispatch({
          type: GET_ALL_PROFILES,
          payload: res.data
        });
      })
      .catch(() => {
        // if returns error -> profiles should be null like init state
        dispatch({
          type: GET_ALL_PROFILES,
          payload: null
        });
      });
  };
}

// get profile by handle
function getProfileByHandleAction(handle) {
  return dispatch => {
    // set loading = true
    dispatch({
      type: PROFILE_LOADING
    });

    // get profile
    axios
      .get(`/api/profile/handle/${handle}`)
      .then(res => {
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        });
      })
      .catch(() => {
        // if no find a profile -> set to null
        dispatch({
          type: GET_PROFILE,
          payload: null
        });
      });
  };
}

export {
  getCurrentProfileAction,
  clearProfileAction,
  createProfileAction,
  deleteProfileAction,
  addExperienceAction,
  addEducationAction,
  removeExperienceAction,
  removeEducationAction,
  getProfilesAction,
  getProfileByHandleAction
};
