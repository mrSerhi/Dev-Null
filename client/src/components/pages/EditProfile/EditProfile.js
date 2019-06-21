import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import isEmpty from "../../../assets/utils/isEmpty";

// actions
import {
  createProfileAction,
  getCurrentProfileAction
} from "../../../actions/profileActions";

// components
import Form from "../../Form/Form";
import FormItem from "../../Form/FormItem/FormItem";
import FormItemSelect from "../../Form/FormItem/FormItemSelect";
import FormItemTextarea from "../../Form/FormItem/FormItemTextarea";
import Button from "../../Button/Button";
import SocialInputGroup from "../CreateProfile/SocialInputGroup/SocialInputGroup";
import EditProfileHeader from "./EditProfileHeader/EditProfileHeader";
import GoBackLink from "../../UI/GoBackLink/GoBackLink";

class EditProfile extends PureComponent {
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

  componentDidMount() {
    this.props.getCurrentProfileAction();

    // check if profile is come
    if (this.props.profile.profile) {
      const { profile } = this.props.profile;

      // some props not came -> for that we checks on props exists or set empty string
      profile.handle = !isEmpty(profile.handle) ? profile.handle : "";
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.status = !isEmpty(profile.status) ? profile.status : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      // skills came like array -> transform to string
      const skillsTransform = profile.skills.join(",");

      // socials
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      const {
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram
      } = profile.social;

      profile.youtube = !isEmpty(youtube) ? youtube : "";
      profile.twitter = !isEmpty(twitter) ? twitter : "";
      profile.facebook = !isEmpty(facebook) ? facebook : "";
      profile.linkedin = !isEmpty(linkedin) ? linkedin : "";
      profile.instagram = !isEmpty(instagram) ? instagram : "";

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsTransform,
        bio: profile.bio,
        githubusername: profile.githubusername,
        youtube: profile.youtube,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        instagram: profile.instagram
      });
    }
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

    // call action to create/update profile
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
              <GoBackLink path="/dashboard" />

              <EditProfileHeader />

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
                  Save Changes
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  createProfileAction: PropTypes.func.isRequired,
  getCurrentProfileAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfileAction, getCurrentProfileAction }
)(EditProfile);
