import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: ""
  };

  validate = data => {
    const error = {};
    let isValid = true;

    if (data.name.length < 3) {
      error.name = "Name must be equal or biggest then 3";
      isValid = false;
    }

    if (data.name === "") {
      error.name = "Name is required";
      isValid = false;
    }

    if (data.email === "") {
      error.email = "Email is required";
      isValid = false;
    }

    if (data.password === "" && data.password2 === "") {
      error.password = "Password is required";
      isValid = false;
    }

    if (data.password !== data.password2) {
      error.notIdenticPassword = "Password not equal";
      isValid = false;
    }

    return { error, isValid };
  };

  handleOnChange = e => this.setState({ [e.target.name]: e.target.value });

  handleOnSubmit = e => {
    e.preventDefault();
    // validate
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
      .catch(ex => console.dir(ex.response.data));

    // clear fields
    this.setState({ name: "", email: "", password: "", password2: "" });
  };

  render() {
    const { name, email, password, password2 } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.handleOnSubmit}>
                <div className="form-group">
                  <input
                    value={name}
                    onChange={this.handleOnChange}
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    value={email}
                    onChange={this.handleOnChange}
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                  />
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    value={password}
                    onChange={this.handleOnChange}
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                  />
                </div>
                <div className="form-group">
                  <input
                    value={password2}
                    onChange={this.handleOnChange}
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="password2"
                  />
                </div>
                <button type="submit" className="btn btn-info btn-block mt-4">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
