import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUserAction } from "../../actions/authActions";
import { CLEAR_ERRORS } from "../../actions/types";

// components
import Form from "../Form/Form";
import FormItem from "../Form/FormItem/FormItem";
import Button from "../Button/Button";
import store from "../../store";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    loading: false
  };

  static getDerivedStateFromProps(nextProp, prevState) {
    if (nextProp.errors !== prevState.errors) {
      return {
        errors: nextProp.errors
      };
    }
    // if user is auth -> rediract on the new route
    if (nextProp.auth.isAuthenticated) {
      nextProp.history.push("/dashboard");
    }

    return null;
  }

  componentDidMount() {
    // redirecting if user is auth to /dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.replace("/dashboard");
    }

    // clear inputs
    this.setState({ email: "", password: "" });

    // clear errros obj in Redux store
    store.dispatch({
      type: CLEAR_ERRORS,
      payload: {}
    });
  }

  handleOnChange = e => this.setState({ [e.target.name]: e.target.value });

  handleOnSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUserAction(user);
  };

  render() {
    const { email, password, errors, loading } = this.state;
    const loadingSpinner = <FontAwesomeIcon icon="spinner" pulse />;
    const icon = (
      <FontAwesomeIcon icon="sign-in-alt" style={{ verticalAlign: "middle" }} />
    );

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your Dev-Null account
              </p>

              <Form noValidate={true} onSubmit={this.handleOnSubmit}>
                <FormItem
                  value={email}
                  onChange={this.handleOnChange}
                  errors={errors}
                  name="email"
                  type="email"
                  placeholder="Email Address"
                />

                <FormItem
                  value={password}
                  onChange={this.handleOnChange}
                  errors={errors}
                  name="password"
                  type="password"
                  placeholder="Password"
                />

                <Button type="submit" classes="btn-block btn-info">
                  Log in {loading ? loadingSpinner : icon}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUserAction: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth, errors: state.errors });

export default connect(
  mapStateToProps,
  { loginUserAction }
)(Login);
