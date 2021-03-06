import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./assets/utils/setAuthToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logoutUserAction } from "./actions/authActions";
import { clearProfileAction } from "./actions/profileActions";

// styles
import "./App.css";

// include font-awesome root conf with nums of icons
import "./fontAwesome";

// components
import Navbar from "./components/Layout/Navbar/Navbar";
import MiddleSection from "./components/Layout/MiddleSection";
// import Footer from "./components/Layout/Footer";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
// pages
import NotFound from "./components/pages/NotFound";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import CreateProfile from "./components/pages/CreateProfile/CreateProfile";
import EditProfile from "./components/pages/EditProfile/EditProfile";
import AddExperience from "./components/AdditionalToProfile/AddExperience/AddExperience";
import AddEducation from "./components/AdditionalToProfile/AddEducation/AddEducation";
import Profiles from "./components/Profiles/Profiles";
import Profile from "./components/Profile/Profile";
import Posts from "./components/Posts/Posts";
import SinglePost from "./components/pages/SinglePost/SinglePost";

// protected route
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

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

  // control token expires
  const currentTime = Date.now() / 1000;

  if (userData.exp < currentTime) {
    // log out user
    store.dispatch(logoutUserAction());
    // clear profile
    store.dispatch(clearProfileAction());
    // redirect to /login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={MiddleSection} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/profiles" component={Profiles} />
            <Route path="/profile/handle/:handle" component={Profile} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute
              path="/profile/create_profile"
              component={CreateProfile}
            />
            <ProtectedRoute
              path="/profile/edit_profile"
              component={EditProfile}
            />
            <ProtectedRoute
              path="/profile/add_experience"
              component={AddExperience}
            />
            <ProtectedRoute
              path="/profile/add_education"
              component={AddEducation}
            />
            <ProtectedRoute path="/posts" component={Posts} />
            <ProtectedRoute path="/post/:postID" component={SinglePost} />

            <Route exact component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
