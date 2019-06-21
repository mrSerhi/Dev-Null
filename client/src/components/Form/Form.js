import React from "react";
import PropTypes from "prop-types";

const Form = props => {
  return (
    <form noValidate={props.noValidate} onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
};

Form.defaultProps = {
  noValidate: false
};

Form.propTypes = {
  noValidate: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired
};

export default Form;
