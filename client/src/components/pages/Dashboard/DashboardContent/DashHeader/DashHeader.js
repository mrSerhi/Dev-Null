import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class DashHeader extends Component {
  render() {
    const { user } = this.props.auth;
    const { profile } = this.props.profile;

    return (
      <p className="lead text-muted">
        Welcome{" "}
        <span className="text-info text-capitalize">
          <Link to={`/profile/handle/${profile.handle}`}>{user.name}</Link>
        </span>
      </p>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps)(DashHeader);
