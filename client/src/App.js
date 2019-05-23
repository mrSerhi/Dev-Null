import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";

// include font-awesome root conf with nums of icons
import "./fontAwesome";

// components
import Navbar from "./components/Layout/Navbar";
import MiddleSection from "./components/Layout/MiddleSection";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <MiddleSection />
      <Footer />
    </div>
  );
}

export default App;
