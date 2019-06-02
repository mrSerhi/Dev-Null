import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import Form from "../../Form/Form";
import FormItem from "../../Form/FormItem/FormItem";
import FormItemSelect from "../../Form/FormItem/FormItemSelect";
import FormItemTextarea from "../../Form/FormItem/FormItemTextarea";
import FormItemSocial from "../../Form/FormItem/FormItemSocial";
import Button from "../../Button/Button";

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

  handleSubmit = e => {
    e.preventDefault();

    alert("Submit");
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleToggleClick = () => {
    return this.setState(prevState => {
      return { showSocials: !prevState.showSocials };
    });
  };

  render() {
    const { showSocials } = this.state;
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
    let socialDefault = "social-links mt-3 ";
    socialDefault = !showSocials ? socialDefault + "d-none" : socialDefault;

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

                <div className={socialDefault}>
                  <small className="text-info">
                    If you have one or more network profiles, you can add them
                    to your profile
                  </small>

                  <FormItemSocial
                    name="facebook"
                    value={this.state.facebook}
                    onChange={this.handleChange}
                    placeholder="Facebook Profile URL"
                    errors={this.state.errors}
                    icon={["fab", "facebook"]}
                  />

                  <FormItemSocial
                    name="instagram"
                    value={this.state.instagram}
                    onChange={this.handleChange}
                    placeholder="Instagram Profile URL"
                    errors={this.state.errors}
                    icon={["fab", "instagram"]}
                  />

                  <FormItemSocial
                    name="youtube"
                    value={this.state.youtube}
                    onChange={this.handleChange}
                    placeholder="Youtube Profile URL"
                    errors={this.state.errors}
                    icon={["fab", "youtube"]}
                  />

                  <FormItemSocial
                    name="twitter"
                    value={this.state.twitter}
                    onChange={this.handleChange}
                    placeholder="Twitter Profile URL"
                    errors={this.state.errors}
                    icon={["fab", "twitter"]}
                  />

                  <FormItemSocial
                    name="linkedin"
                    value={this.state.linkedin}
                    onChange={this.handleChange}
                    placeholder="Linkedin Profile URL"
                    errors={this.state.errors}
                    icon={["fab", "linkedin"]}
                  />
                </div>

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
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);
