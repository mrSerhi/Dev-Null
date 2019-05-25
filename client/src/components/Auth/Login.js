import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import Form from "../Form/Form";
import FormItem from "../Form/FormItem/FormItem";
import Button from "../Button/Button";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleOnChange = e => this.setState({ [e.target.name]: e.target.value });

  handleOnSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    alert("LogIn!");

    this.setState({ email: "", password: "" });
  };

  render() {
    const { email, password } = this.state;

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
                  name="email"
                  type="email"
                  placeholder="Email Address"
                />

                <FormItem
                  value={password}
                  onChange={this.handleOnChange}
                  name="password"
                  type="password"
                  placeholder="Password"
                />

                <Button type="submit" classes="btn-block btn-info">
                  LogIn <FontAwesomeIcon icon="sign-in-alt" />
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
