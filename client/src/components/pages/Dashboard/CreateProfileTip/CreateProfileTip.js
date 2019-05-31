import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import drawing from "../../../../assets/icons/drawing.svg";

const drawingStyles = {
  width: "35px",
  height: "35px"
};

const CreateProfileTip = ({ user }) => {
  return (
    <div>
      <p className="lead text-muted">
        Welcome <span className="text-info text-capitalize">{user.name}</span>
      </p>
      <p>
        You don't have a profile yet, please follow the link and create a
        profile <img src={drawing} alt="drawing" style={drawingStyles} />
      </p>
      <Link to="/create_profile" className="btn btn-outline btn-primary">
        Create profile <FontAwesomeIcon icon="id-badge" />
      </Link>
    </div>
  );
};

CreateProfileTip.propTypes = {
  user: PropTypes.object.isRequired
};

export default CreateProfileTip;
