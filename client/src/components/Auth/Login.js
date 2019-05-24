import React, { Component } from "react";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  validate = data => {
    const error = {};
    let isValid = true;

    if (data.email === "") {
      error.email = "Email is required";
      isValid = false;
    }

    if (data.password === "") {
      error.password = "Password is required";
      isValid = false;
    }

    return { error, isValid };
  };

  handleOnChange = e => this.setState({ [e.target.name]: e.target.value });

  handleOnSubmit = e => {
    e.preventDefault();
    // validate
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    const { error, isValid } = this.validate(data);

    if (!isValid) {
      console.log(error);
      return;
    }
    alert("LogIn!");

    this.setState({ email: "", password: "" });
  };

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your Dev-Null account
              </p>

              <form onSubmit={this.handleOnSubmit}>
                <div className="form-group">
                  <input
                    value={this.state.email}
                    onChange={this.handleOnChange}
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <input
                    value={this.state.password}
                    onChange={this.handleOnChange}
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                  />
                </div>
                <button type="submit" className="btn btn-info btn-block mt-4">
                  LogIn
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
