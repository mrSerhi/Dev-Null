import { combineReducers } from "redux";

// reducers
import authReducer from "./authReduces";

// module which contain a root reducer

export default combineReducers({
  auth: authReducer
});
