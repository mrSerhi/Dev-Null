import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfileAction,
  deleteProfileAction
} from "../../../actions/profileActions";

// components
import Spinner from "../../UI/Spinner/Spinner";
import CreateProfileTip from "./CreateProfileTip/CreateProfileTip";
import DashboardContent from "./DashboardContent/DashboardContent";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfileAction();
  }

  handleDeleteClick = () => {
    this.props.deleteProfileAction();
  };

  renderProfile() {
    const { user } = this.props.auth;
    const { loading, profile } = this.props.profile;

    if (profile === null || loading) {
      return <Spinner />;
    } else {
      // checking if profile equal {}, when display block to create profile
      if (Object.keys(profile).length > 0) {
        // display profile etc...
        return <DashboardContent onDelete={this.handleDeleteClick} />;
      } else {
        return <CreateProfileTip user={user} />;
      }
    }
  }

  render() {
    return (
      <section className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-5">Dashboard</h1>
              {this.renderProfile()}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfileAction: PropTypes.func.isRequired,
  deleteProfileAction: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfileAction, deleteProfileAction }
)(Dashboard);
