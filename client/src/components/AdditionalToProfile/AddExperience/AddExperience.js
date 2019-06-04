import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import store from "../../../store";
import { CLEAR_ERRORS } from "../../../actions/types";

// actions
import { addExperienceAction } from "../../../actions/profileActions";

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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    }

    return null;
  }

  componentWillUnmount() {
    // clear Errors from store
    store.dispatch({
      type: CLEAR_ERRORS,
      payload: {}
    });
  }

  handeOnSubmit = e => {
    e.preventDefault();

    const { addExperienceAction, history } = this.props;
    const newExp = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    // call profile action
    addExperienceAction(newExp, history);
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
                <h6>
                  From <sup className="text-danger">*</sup>
                </h6>
                <DatePicker
                  className="form-control"
                  selected={this.state.from}
                  onChange={this.handleOnChangeFrom}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/MM/yyyy"
                />
                <h6 className="mt-2">To</h6>
                <DatePicker
                  className="form-control"
                  selected={this.state.to}
                  onChange={this.handleOnChangeTo}
                  disabled={this.state.disabled}
                  dateFormat="dd/MM/yyyy"
                  placeholderText={
                    this.state.disabled
                      ? "Cool, You're working..."
                      : "dd/MM/yyyy"
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
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  addExperienceAction: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { addExperienceAction }
)(withRouter(AddExperience));
