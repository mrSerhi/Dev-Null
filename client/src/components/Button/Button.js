import React from "react";
import classnames from "classnames";

const Button = ({ type, classes, ...props }) => {
  return (
    <button type={type} className={classnames("btn", classes)}>
      {props.children}
    </button>
  );
};

export default Button;
