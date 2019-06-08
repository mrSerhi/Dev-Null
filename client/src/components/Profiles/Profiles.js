import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// actions
import { getProfilesAction } from "../../actions/profileActions";

// components
import Spinner from "../UI/Spinner/Spinner";
import ProfilesHeader from "./ProfilesHeader/ProfilesHeader";
import ProfilesCard from "./ProfilesCard/ProfilesCard";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfilesAction();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.url !== this.props.location.pathname) {
      this.props.history.push("/not_found");
    }
  }

  renderingProfiles = () => {
    const { profiles, loading } = this.props.profile;

    if (profiles === null || loading) {
      return <Spinner />;
    } else {
      // check if profiles not empty
      if (profiles.length > 0) {
        return profiles.map(p => <ProfilesCard key={p._id} profile={p} />);
      } else {
        return (
          <h1 className="text-danger">
            Use your chance and create a firsty profile!
          </h1>
        );
      }
    }
  };

  render() {
    return (
      <section className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ProfilesHeader />
              <div className="row">{this.renderingProfiles()}</div>
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

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfilesAction: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getProfilesAction }
)(Profiles);
