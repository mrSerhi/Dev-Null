import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";

// include font-awesome root conf with nums of icons
import "./fontAwesome";

// components
import Navbar from "./components/Layout/Navbar";
import MiddleSection from "./components/Layout/MiddleSection";
import Footer from "./components/Layout/Footer";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";

function App() {
  return (
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
  );
}

export default App;
