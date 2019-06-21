import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GoBackLink = ({ path, classes, label }) => {
  return (
    <Link to={path} className={classes}>
      <FontAwesomeIcon icon="arrow-circle-left" /> {label}
    </Link>
  );
};

GoBackLink.defaultProps = {
  classes: "btn btn-info mb-3",
  label: "Go Back"
};

GoBackLink.propTypes = {
  path: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired
};

export default GoBackLink;
