import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainNav = () => {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">
          Sign Up{" "}
          <FontAwesomeIcon
            icon="user-plus"
            style={{ verticalAlign: "middle" }}
          />
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">
          Login{" "}
          <FontAwesomeIcon
            icon="sign-in-alt"
            style={{ verticalAlign: "middle" }}
          />
        </NavLink>
      </li>
    </ul>
  );
};

export default MainNav;
