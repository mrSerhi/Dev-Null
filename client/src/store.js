import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

// set init state
const initState = {};

const middleware = [thunk]; // array of middlewares for using async redux code better

// needed for including redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
