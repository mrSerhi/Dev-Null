import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUserAction } from "../../../actions/authActions";

// components
import AuthNav from "./AuthNavbar";
import MainNav from "./MainNav";

class Navbar extends Component {
  handlingLogoutClick = e => {
    e.preventDefault();

    // log out
    this.props.logoutUserAction();

    // redirect to '/'
    this.props.history.push("/");
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const AuthNavigation = (
      <AuthNav onLogout={this.handlingLogoutClick} user={user} />
    );

    const authLinkPath = this.props.auth.isAuthenticated ? "/dashboard" : "/";

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to={authLinkPath}>
            DevNull
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/profiles">
                  Developers
                </NavLink>
              </li>
            </ul>

            {isAuthenticated ? AuthNavigation : <MainNav />}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUserAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUserAction }
)(withRouter(Navbar));
