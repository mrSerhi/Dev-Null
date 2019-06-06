import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// actions
import { getProfileByHandleAction } from "../../actions/profileActions";
// components
import Spinner from "../UI/Spinner/Spinner";

class Profile extends Component {
  componentDidMount() {
    // get handle from URL
    const { handle } = this.props.match.params;

    if (handle) {
      this.props.getProfileByHandleAction(handle);
    }
  }

  renderingProfile = () => {
    const { loading, profile } = this.props.profile;

    if (profile === null || loading) {
      return <Spinner />;
    } else {
      // check if profile is not empty
      if (Object.keys(profile).length > 0) {
        return (
          <Fragment>
            <h1>TODO:header</h1>
            <h1>TODO:bio</h1>
            <h1>TODO:exp and edu</h1>
            <h1>TODO:github</h1>
          </Fragment>
        );
      }
    }
  };

  render() {
    return (
      <section className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12 m-auto">{this.renderingProfile()}</div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandleAction: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getProfileByHandleAction }
)(Profile);
