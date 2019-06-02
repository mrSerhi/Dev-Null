import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const Button = ({ type, classes, ...props }) => {
  return (
    <button type={type} className={classnames("btn", classes)} {...props}>
      {props.children}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  classes: ""
};

Button.propTypes = {
  type: PropTypes.string,
  classes: PropTypes.string
};

export default Button;
