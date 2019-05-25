import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  handleOnChange = e => this.setState({ [e.target.name]: e.target.value });

  handleOnSubmit = e => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // create user
    axios
      .post("/api/users/register", user)
      .then(res => console.log(res.data))
      .catch(ex => this.setState({ errors: ex.response.data }));
  };

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

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

export default Register;
