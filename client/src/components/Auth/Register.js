import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      .catch(ex => this.setState({ errors: ex.response.data }));

    // clear fields
    // this.setState({ name: "", email: "", password: "", password2: "" });
  };

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  render() {
    const { name, email, password, password2, errors } = this.state;
    const tip = (
      <small className="form-text text-muted">
        This site uses Gravatar so if you want a profile image, use a Gravatar
        email
      </small>
    );

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Dev-Null account</p>

              <form noValidate onSubmit={this.handleOnSubmit}>
                <div className="form-group">
                  <input
                    name="name"
                    value={name}
                    onChange={this.handleOnChange}
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.name || (errors.name && name === ""),
                      "is-valid": name !== ""
                    })}
                    placeholder="Name"
                  />
                  <div className="invalid-feedback">{errors.name}</div>
                </div>

                <div className="form-group">
                  <input
                    name="email"
                    value={email}
                    onChange={this.handleOnChange}
                    type="email"
                    className={classnames("form-control", {
                      "is-invalid":
                        errors.email ||
                        (!this.validateEmail(email) && email !== ""),
                      "is-valid": this.validateEmail(email) || errors.email
                    })}
                    placeholder="Email Address"
                  />
                  {!errors.email ? tip : ""}

                  <div className="invalid-feedback">{errors.email}</div>
                </div>

                <div className="form-group">
                  <input
                    name="password"
                    value={password}
                    onChange={this.handleOnChange}
                    type="password"
                    className={classnames("form-control", {
                      "is-invalid":
                        errors.password || (errors.password && password === ""),
                      "is-valid": password !== "" && !errors.password
                    })}
                    placeholder="Password"
                  />

                  <div className="invalid-feedback">{errors.password}</div>
                </div>

                <div className="form-group">
                  <input
                    name="password2"
                    value={password2}
                    onChange={this.handleOnChange}
                    type="password"
                    className={classnames("form-control", {
                      "is-invalid": errors.password2 && password2 !== password,
                      "is-valid":
                        password2 === password &&
                        password !== "" &&
                        password2 !== ""
                    })}
                    placeholder="Confirm Password"
                  />

                  <div className="invalid-feedback">{errors.password2}</div>
                </div>

                <button type="submit" className="btn btn-info btn-block mt-4">
                  Register <FontAwesomeIcon icon="user-plus" />
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
