import { combineReducers } from "redux";

// MODULE WITH ROOT REDUCER

// reducers
import authReducer from "./authReduces";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer
});
