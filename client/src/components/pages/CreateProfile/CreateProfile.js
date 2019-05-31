import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class CreateProfile extends Component {
  state = {
    showSocials: false,
    handle: "", //*
    company: "",
    website: "",
    location: "",
    status: "", //*
    skills: [], //*
    bio: "",
    githubusername: "",
    youtube: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    errors: {}
  };
  render() {
    return (
      <section className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <h1 className="display-5 text-center">Create Profile</h1>
              <p className="text-center lead">
                In this page you can create your own profile. Please, fill in
                the fields to make your profile look perfect!
              </p>
              <small>
                fields with <span className="text-danger">*</span> - are
                required
              </small>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);
