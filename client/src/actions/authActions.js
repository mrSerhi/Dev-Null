import axios from "axios";
import setAuthToken from "../assets/utils/setAuthToken";
import jwt_decode from "jwt-decode";

// types
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// register action
function registerUserAction(userData, history) {
  return dispatch => {
    // call a server
    axios
      .post("/api/users/register", userData)
      .then(() => {
        // if response Ok -> rediract to /login
        history.push("/login");
      })
      .catch(ex => {
        // use dispatch for maping state to props
        dispatch({
          type: GET_ERRORS,
          payload: ex.response.data
        });
      });
  };
}

// logging user action
function loginUserAction(userData) {
  return dispatch => {
    // get user token
    axios
      .post("/api/users/login", userData)
      .then(res => {
        // save token to localstorage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        // set token to Auth header for req
        setAuthToken(token);
        // decode jwt token with responses user info(name, email, avatar)
        const tokenDecoded = jwt_decode(token);
        // set current user
        dispatch({
          type: SET_CURRENT_USER,
          payload: tokenDecoded
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

// log out user action
function logoutUserAction() {
  return dispatch => {
    // remove token from localStorage
    localStorage.removeItem("jwtToken");

    // remove Auth header included token
    setAuthToken(); // by default arg -> null

    // set current user in log out
    dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    });
  };
}

export { registerUserAction, loginUserAction, logoutUserAction };
