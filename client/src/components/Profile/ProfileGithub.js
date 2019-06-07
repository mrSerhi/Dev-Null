import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  _isMounted = false; // control memory leak then component is unmounted

  state = {
    clientID: "Iv1.a02dddd88bfd01a3",
    clientSecret: "dba67c4ee4b274aab91a40199b5e22d6bcb23af0",
    countOfRepos: 4,
    sort: "created",
    direction: "desc",
    repos: []
  };

  componentDidMount() {
    this._isMounted = true;
    const { userName } = this.props;
    const {
      clientID,
      clientSecret,
      countOfRepos,
      sort,
      direction
    } = this.state;
    const URL = `https://api.github.com/users/${userName}/repos`;
    const q = `?page=1&per_page=${countOfRepos}&sort=${sort}&direction=${direction}`;
    const auth = `&client_id=${clientID}&client_secret=${clientSecret}`;
    axios
      .get(URL + q + auth)
      .then(res => {
        if (this._isMounted) this.setState({ repos: res.data });
      })
      .catch(ex => console.error(ex));
  }

  componentWillUnmount() {
    this._isMounted = false; // clear async process
  }

  renderingGithubRepos = () => {
    const { repos } = this.state;

    return repos.map(r => {
      return (
        <div key={r.id} className="col mb-2">
          <div className="card card-body bg-light">
            <a href={r.html_url} className="btn btn-link text-primary">
              <h3>{r.name}</h3>
            </a>

            <p className="lead">
              <span className="text-muted text-uppercase">Description:</span>{" "}
              <small>{r.description}</small>
            </p>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="row my-5">
        <h2 className="mb-3 w-100 text-center">GitHub Repositories</h2>
        {this.renderingGithubRepos()}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  userName: PropTypes.string.isRequired
};

export default ProfileGithub;
