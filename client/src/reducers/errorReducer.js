// types of actions
import { GET_ERRORS } from "../actions/types";

const initState = {};

function errorReducer(state = initState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}

export default errorReducer;
