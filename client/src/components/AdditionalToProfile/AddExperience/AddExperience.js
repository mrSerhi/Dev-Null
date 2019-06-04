import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";

// styles for datepicker
import "react-datepicker/dist/react-datepicker.css";

// components
import Form from "../../Form/Form";
import FormItem from "../../Form/FormItem/FormItem";
import FormItemTextarea from "../../Form/FormItem/FormItemTextarea";
import ExperienceHeader from "./ExperienceHeader/ExperienceHeader";
import Button from "../../Button/Button";
import FormItemCheckbox from "../../Form/FormItem/FormItemCheckbox";

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
      <section className="add-experience mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <ExperienceHeader />

              <Form onSubmit={this.handeOnSubmit}>
                <FormItem
                  name="title"
                  value={title}
                  onChange={this.handleOnChange}
                  placeholder="*Job Title"
                  errors={errors}
                />
                <FormItem
                  name="company"
                  value={company}
                  onChange={this.handleOnChange}
                  placeholder="*Company Title"
                  errors={errors}
                />
                <FormItem
                  name="location"
                  value={location}
                  onChange={this.handleOnChange}
                  placeholder="Location"
                  errors={errors}
                />
                <span className="mr-1">From:</span>
                <DatePicker
                  name="from"
                  selected={from}
                  onChange={this.handleOnChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/MM/yyyy"
                />
                <span className="ml-3 mr-1">To:</span>
                <DatePicker
                  name="to"
                  selected={to}
                  onChange={this.handleOnChange}
                  disabled={disabled}
                  dateFormat="dd/MM/yyyy"
                  placeholderText={disabled ? "You working..." : "dd/MM/yyyy"}
                />
                <FormItemCheckbox
                  checkboxID="exp-current"
                  value={current}
                  checked={current}
                  onChecked={this.handleCheckClick}
                  label="currently working"
                />
                <FormItemTextarea
                  name="description"
                  value={description}
                  onChange={this.handleOnChange}
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
