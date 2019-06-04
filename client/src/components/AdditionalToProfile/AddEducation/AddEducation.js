import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import store from "../../../store";
import { CLEAR_ERRORS } from "../../../actions/types";

// actions
import { addEducationAction } from "../../../actions/profileActions";

// styles for datepicker
import "react-datepicker/dist/react-datepicker.css";

// components
import Form from "../../Form/Form";
import FormItem from "../../Form/FormItem/FormItem";
import FormItemTextarea from "../../Form/FormItem/FormItemTextarea";
import Button from "../../Button/Button";
import FormItemCheckbox from "../../Form/FormItem/FormItemCheckbox";
import EducationHeader from "./EducationHeader/EducationHeader";

class AddEducation extends Component {
  state = {
    school: "", //*
    degree: "", //*
    fieldofstudy: "", //*
    from: "", //*
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

    const { addEducationAction, history } = this.props;
    const newEdu = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    // call profile action
    addEducationAction(newEdu, history);
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
              <EducationHeader />

              <Form onSubmit={this.handeOnSubmit}>
                <FormItem
                  name="school"
                  value={this.state.school}
                  onChange={this.handleOnChange}
                  placeholder="*School"
                  errors={this.state.errors}
                />
                <FormItem
                  name="degree"
                  value={this.state.degree}
                  onChange={this.handleOnChange}
                  placeholder="*Degree"
                  errors={this.state.errors}
                />
                <FormItem
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.handleOnChange}
                  placeholder="*Field of study"
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
                      ? "Awesome, you studying..."
                      : "dd/MM/yyyy"
                  }
                />
                <FormItemCheckbox
                  checkboxID="exp-current"
                  value={this.state.current}
                  checked={this.state.current}
                  onChecked={this.handleOnCheck}
                  label="currently studying?"
                />
                <FormItemTextarea
                  name="description"
                  value={this.state.description}
                  onChange={this.handleOnChange}
                  placeholder="What you study? What is your favorite subject? etc..."
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

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  addEducationAction: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { addEducationAction }
)(withRouter(AddEducation));
