import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./assets/utils/setAuthToken";
import { SET_CURRENT_USER } from "./actions/types";

// styles
import "./App.css";

// include font-awesome root conf with nums of icons
import "./fontAwesome";

// components
import Navbar from "./components/Layout/Navbar";
import MiddleSection from "./components/Layout/MiddleSection";
import Footer from "./components/Layout/Footer";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";

// check if current user token exists in localStorage.
// the User who passed auth verification has access to change profile and etc...
if (localStorage.jwtToken) {
  // decoded token
  const userData = jwt_decode(localStorage.jwtToken);

  // set Auth-header
  setAuthToken(localStorage.jwtToken);

  // set user and auth in store.auth
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: userData
  });
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route exect path="/" component={MiddleSection} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
