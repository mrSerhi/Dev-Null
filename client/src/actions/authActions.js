import axios from "axios";

// types
import { GET_ERRORS } from "./types";

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

export default registerUserAction;
