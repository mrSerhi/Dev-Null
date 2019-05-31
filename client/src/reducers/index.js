import { combineReducers } from "redux";

// MODULE WITH ROOT REDUCER

// reducers
import authReducer from "./authReduces";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
});
