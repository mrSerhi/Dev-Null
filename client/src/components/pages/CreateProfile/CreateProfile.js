import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// actions
import { createProfileAction } from "../../../actions/profileActions";

// components
import Form from "../../Form/Form";
import FormItem from "../../Form/FormItem/FormItem";
import FormItemSelect from "../../Form/FormItem/FormItemSelect";
import FormItemTextarea from "../../Form/FormItem/FormItemTextarea";
import Button from "../../Button/Button";
import SocialInputGroup from "./SocialInputGroup/SocialInputGroup";
import CreateProfileHeader from "./CreateProfileHeader/CreateProfileHeader";

class CreateProfile extends Component {
  state = {
    showSocials: false,
    handle: "", //*
    company: "",
    website: "",
    location: "",
    status: "", //*
    skills: "", //*
    bio: "",
    githubusername: "",
    youtube: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    errors: {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return {
        errors: nextProps.errors
      };
    }

    return null;
  }

  handleSubmit = e => {
    e.preventDefault();

    const { history, createProfileAction } = this.props;
    const newProfile = {
      handle: this.state.handle, //*
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status, //*
      skills: this.state.skills, //*
      bio: this.state.bio,
      githubusername: this.state.githubusername,
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram
    };
    createProfileAction(newProfile, history);
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleToggleClick = () => {
    return this.setState(prevState => {
      return { showSocials: !prevState.showSocials };
    });
  };

  render() {
    const { showSocials, errors } = this.state;
    const statusOptions = [
      { value: "0", label: "Select Professional Status" },
      { value: "Developer", label: "Developer" },
      { value: "Junior Developer", label: "Junior Developer" },
      { value: "Senior Developer", label: "Senior Developer" },
      { value: "Manager", label: "Manager" },
      { value: "Student or Learning", label: "Student or Learning" },
      { value: "Instructor", label: "Instructor or Teacher" },
      { value: "Intern", label: "Intern or VITshnik" },
      { value: "Other", label: "Other" }
    ];

    return (
      <section className="create-profile mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <CreateProfileHeader />

              <Form onSubmit={this.handleSubmit}>
                <FormItem
                  name="handle"
                  value={this.state.handle}
                  onChange={this.handleChange}
                  placeholder="* Profile handle"
                  errors={this.state.errors}
                />

                <FormItemSelect
                  name="status"
                  value={this.state.status}
                  onChange={this.handleChange}
                  errors={this.state.errors}
                  options={statusOptions}
                />

                <FormItem
                  name="company"
                  value={this.state.company}
                  onChange={this.handleChange}
                  placeholder="Company"
                  errors={this.state.errors}
                />

                <FormItem
                  name="website"
                  value={this.state.website}
                  onChange={this.handleChange}
                  placeholder="Website"
                  errors={this.state.errors}
                />

                <FormItem
                  name="location"
                  value={this.state.location}
                  onChange={this.handleChange}
                  placeholder="Location"
                  errors={this.state.errors}
                />

                <FormItem
                  name="skills"
                  value={this.state.skills}
                  onChange={this.handleChange}
                  placeholder="* Write your skills with comma"
                  errors={this.state.errors}
                />

                <FormItem
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.handleChange}
                  placeholder="GitHub Username"
                  errors={this.state.errors}
                />

                <FormItemTextarea
                  name="bio"
                  value={this.state.bio}
                  onChange={this.handleChange}
                  placeholder="Type some of your bio"
                  errors={this.state.errors}
                />

                <Button
                  classes="btn-outline-dark mb-3"
                  onClick={this.handleToggleClick}
                >
                  <FontAwesomeIcon icon="plus" /> Add Social Network Links{" "}
                  <small className="text-info" style={{ verticalAlign: "top" }}>
                    optional
                  </small>
                </Button>

                <SocialInputGroup
                  youtube={this.state.youtube}
                  twitter={this.state.twitter}
                  facebook={this.state.facebook}
                  linkedin={this.state.linkedin}
                  instagram={this.state.instagram}
                  onChange={this.handleChange}
                  toggling={showSocials}
                  errors={errors}
                />

                <Button type="submit" classes="btn-info btn-block">
                  Done!
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  createProfileAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfileAction }
)(CreateProfile);
