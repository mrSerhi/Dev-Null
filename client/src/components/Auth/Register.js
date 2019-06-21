import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import store from "../../store";
import { CLEAR_ERRORS } from "../../actions/types";
import PropTypes from "prop-types";

// include actions
import { registerUserAction } from "../../actions/authActions";

// components
import Form from "../Form/Form";
import FormItem from "../Form/FormItem/FormItem";
import Button from "../Button/Button";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  static getDerivedStateFromProps(nextProp, prevState) {
    if (nextProp.errors !== prevState.errors) {
      return {
        errors: nextProp.errors
      };
    }

    return null;
  }

  componentDidMount() {
    // redirecting if user is auth to /dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.replace("/dashboard");
    }
  }

  componentWillUnmount() {
    // clear errors obj in Redux store
    store.dispatch({
      type: CLEAR_ERRORS,
      payload: {}
    });
  }

  handleOnChange = e => this.setState({ [e.target.name]: e.target.value });

  handleOnSubmit = e => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // call action for registration user
    this.props.registerUserAction(user, this.props.history);
  };

  render() {
    const { name, email, password, password2, errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Dev-Null account</p>

              <Form noValidate={true} onSubmit={this.handleOnSubmit}>
                <FormItem
                  value={name}
                  name="name"
                  onChange={this.handleOnChange}
                  errors={errors}
                  placeholder="Name"
                />

                <FormItem
                  value={email}
                  name="email"
                  onChange={this.handleOnChange}
                  type="email"
                  errors={errors}
                  placeholder="Email address"
                />

                <FormItem
                  value={password}
                  name="password"
                  onChange={this.handleOnChange}
                  type="password"
                  errors={errors}
                  placeholder="Password"
                />

                <FormItem
                  value={password2}
                  name="password2"
                  onChange={this.handleOnChange}
                  type="password"
                  errors={errors}
                  placeholder="Confirm Password"
                />

                <Button type="submit" classes="btn-block btn-info">
                  Register <FontAwesomeIcon icon="user-plus" />
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUserAction: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

// state => from root reducer
const mapStateToProps = state => ({ auth: state.auth, errors: state.errors });

export default connect(
  mapStateToProps,
  { registerUserAction }
)(Register);
