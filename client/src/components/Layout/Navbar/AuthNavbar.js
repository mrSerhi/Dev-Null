import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const imgStyle = {
  width: "32px",
  marginRight: "0.3rem"
};

const AuthNav = ({ onLogout, user }) => {
  const { avatar, name } = user;

  return (
    <ul className="navbar-nav ml-auto align-items-center">
      <li className="nav-item">
        <NavLink className="nav-link" to="/dashboard">
          Dashboard
        </NavLink>
      </li>
      <li className="nav-item">
        <a onClick={onLogout} href="#!" className="nav-link">
          <img
            src={avatar}
            className="rounded-circle"
            style={imgStyle}
            alt={name}
            title="For using avatar, you should be register on Gravatar which use your email"
          />
          log out{" "}
          <FontAwesomeIcon
            icon="sign-out-alt"
            style={{ verticalAlign: "middle" }}
          />
        </a>
      </li>
    </ul>
  );
};

AuthNav.propTypes = {
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default AuthNav;
