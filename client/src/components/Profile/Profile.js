import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "../../assets/utils/isEmpty";

// actions
import { getProfileByHandleAction } from "../../actions/profileActions";
// components
import Spinner from "../UI/Spinner/Spinner";
import ProfileHeader from "./ProfileHeader";
import ProfileBio from "./ProfileBio";
import ProfileAdditional from "./ProfileAdditional/ProfileAdditional";
import GoBackLink from "../UI/GoBackLink/GoBackLink";
import ProfileGithub from "./ProfileGithub";

class Profile extends Component {
  componentDidMount() {
    // get handle from URL
    const { handle } = this.props.match.params;

    if (handle) {
      this.props.getProfileByHandleAction(handle);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.url !== this.props.location.pathname) {
      this.props.history.push("/not_found");
    }
  }

  renderingProfile = () => {
    const { loading, profile } = this.props.profile;

    if (profile === null || loading) {
      return <Spinner />;
    } else {
      return (
        <Fragment>
          <ProfileHeader profile={profile} />
          <ProfileBio profile={profile} />
          <ProfileAdditional profile={profile} />
          {!isEmpty(profile.githubusername) ? (
            <ProfileGithub userName={profile.githubusername} />
          ) : null}
        </Fragment>
      );
    }
  };

  render() {
    return (
      <section className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12 m-auto">
              <GoBackLink path="/profiles" />
              {this.renderingProfile()}
            </div>
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
