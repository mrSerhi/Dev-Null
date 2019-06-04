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

  handeOnSubmit = e => {
    e.preventDefault();

    alert("submit");
  };

  handleOnChange = e => this.setState({ [e.target.name]: e.target.value });

  handleOnChangeFrom = data => this.setState({ from: data });
  handleOnChangeTo = data => this.setState({ to: data });

  handleOnCheck = () => {
    this.setState(prevState => ({
      current: !prevState.current,
      disabled: !prevState.disabled,
      to: ""
    }));
  };

  render() {
    return (
      <section className="add-experience mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <ExperienceHeader />

              <Form onSubmit={this.handeOnSubmit}>
                <FormItem
                  name="title"
                  value={this.state.title}
                  onChange={this.handleOnChange}
                  placeholder="*Job Title"
                  errors={this.state.errors}
                />
                <FormItem
                  name="company"
                  value={this.state.company}
                  onChange={this.handleOnChange}
                  placeholder="*Company Title"
                  errors={this.state.errors}
                />
                <FormItem
                  name="location"
                  value={this.state.location}
                  onChange={this.handleOnChange}
                  placeholder="Location"
                  errors={this.state.errors}
                />
                <span className="mr-1">From:</span>
                <DatePicker
                  selected={this.state.from}
                  onChange={this.handleOnChangeFrom}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/MM/yyyy"
                />
                <span className="ml-3 mr-1">To:</span>
                <DatePicker
                  selected={this.state.to}
                  onChange={this.handleOnChangeTo}
                  disabled={this.state.disabled}
                  dateFormat="dd/MM/yyyy"
                  placeholderText={
                    this.state.disabled ? "You working..." : "dd/MM/yyyy"
                  }
                />
                <FormItemCheckbox
                  checkboxID="exp-current"
                  value={this.state.current}
                  checked={this.state.current}
                  onChecked={this.handleOnCheck}
                  label="currently working?"
                />
                <FormItemTextarea
                  name="description"
                  value={this.state.description}
                  onChange={this.handleOnChange}
                  placeholder="Some of your responsabilities from your last job..."
                  errors={this.state.errors}
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
