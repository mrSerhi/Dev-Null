import axios from "axios";

function setAuthToken(token = null) {
  // set token to every requets to a server
  if (token) {
    axios.defaults.headers.common["authorization"] = token;
  } else {
    // remove Auth header
    delete axios.defaults.headers.common["authorization"];
  }
}

export default setAuthToken;
