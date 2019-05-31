import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfileAction } from "../../../actions/profileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfileAction();
  }

  render() {
    return <h1 className="display text-center">Dashboard component</h1>;
  }
}

Dashboard.propTypes = {
  getCurrentProfileAction: PropTypes.func.isRequired
};

export default connect(
  null,
  { getCurrentProfileAction }
)(Dashboard);
