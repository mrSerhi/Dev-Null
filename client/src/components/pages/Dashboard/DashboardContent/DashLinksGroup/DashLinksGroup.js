import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashLinksGroup = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/profile/edit_profile" className="btn btn-dark">
        <FontAwesomeIcon icon="edit" /> Edit Profile
      </Link>

      <Link to="/profile/add_experience" className="btn btn-dark">
        <FontAwesomeIcon icon="briefcase" /> Add Experience
      </Link>

      <Link to="/profile/add_education" className="btn btn-dark">
        <FontAwesomeIcon icon="graduation-cap" /> Add Education
      </Link>
    </div>
  );
};

export default DashLinksGroup;
