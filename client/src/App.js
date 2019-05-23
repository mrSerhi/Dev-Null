import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; //global bootsrap css styles

// include font-awesome root conf with nums of icons
import "./fontAwesome";

function App() {
  return (
    <div className="App">
      <h1 className="display-3 text-center">
        <FontAwesomeIcon icon="check-square" color="yellow" />
        DevNull project start at now
        <FontAwesomeIcon icon="coffee" rotation={90} />
      </h1>
    </div>
  );
}

export default App;
