import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import isEmpty from "../../assets/utils/isEmpty";

const ProfileBio = ({ profile: { bio, skills, user } }) => {
  const renderingSkills = () => {
    return skills.map(sk => {
      return (
        <li
          key={sk + Date.now}
          className="list-inline-item text-uppercase mr-3"
        >
          <FontAwesomeIcon icon="check" />
          {sk}
        </li>
      );
    });
  };

  const renderingBIO = () => {
    return !isEmpty(bio) ? (
      bio
    ) : (
      <span className="text-danger">
        {user.name.toUpperCase()} dosn't have a bio...
      </span>
    );
  };

  return (
    <div className="row my-5">
      <div className="card card-body bg-light">
        <h3 className="display-5 text-capitalize text-center text-primary">
          {user.name}'s bio
        </h3>
        <p className="lead mt-3">{renderingBIO()}</p>

        <hr />

        <h3 className="display-5 text-capitalize text-center text-primary">
          Skills
        </h3>
        <ul className="list-inline my-3">{renderingSkills()}</ul>
      </div>
    </div>
  );
};

ProfileBio.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileBio;
