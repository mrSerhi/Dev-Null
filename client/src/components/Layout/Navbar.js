import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUserAction } from "../../actions/authActions";

const imgStyle = {
  width: '32px',
  marginRight: '0.3rem'
}

class Navbar extends Component {

  handlingLogoutClick = e => {
    e.preventDefault()

    // log out
    this.props.logoutUserAction();
  } 

  render() {
    const {isAuthenticated, user } = this.props.auth;

    // navbar for authorized users
    const authNav = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a onClick={this.handlingLogoutClick} href="#!" className="nav-link">
            <img 
              src={user.avatar} 
              className="rounded-circle" 
              style={imgStyle} alt={user.name} 
              title="For using avatar, you should be register on Gravatar which use your email" 
            />
            log out
          </a>
        </li>
      </ul>
    );
    // navbar for all users
    const mainNav = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">
            Sign Up
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
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

          {isAuthenticated ? authNav : mainNav}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUserAction }
)(Navbar);
