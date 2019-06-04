import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import Form from "../../Form/Form";
import FormItem from "../../Form/FormItem/FormItem";
import FormItemTextarea from "../../Form/FormItem/FormItemTextarea";
import ExperienceHeader from "./ExperienceHeader/ExperienceHeader";
import Button from "../../Button/Button";

class AddExperience extends Component {
  state = {
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    disabled: false,
    description: "",
    errors: {}
  };
  render() {
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
      errors,
      disabled
    } = this.state;

    return (
      <section className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <ExperienceHeader />

              <Form onSubmit={this.onSubmitCLick}>
                <FormItem
                  name="title"
                  value={title}
                  onChange={this.handleChange}
                  placeholder="*Job Title"
                  errors={errors}
                />

                <FormItem
                  name="company"
                  value={company}
                  onChange={this.handleChange}
                  placeholder="*Company Title"
                  errors={errors}
                />

                <FormItem
                  name="location"
                  value={location}
                  onChange={this.handleChange}
                  placeholder="Location"
                  errors={errors}
                />

                {/* from */}
                {/* to */}
                {/* curent */}

                <FormItemTextarea
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                  placeholder="Some of your responsabilities from your last job..."
                  errors
                />

                <Button type="submit" classes="btn-info">
                  <FontAwesomeIcon icon="plus" /> Add to profile
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default connect(mapStateToProps)(withRouter(AddExperience));
