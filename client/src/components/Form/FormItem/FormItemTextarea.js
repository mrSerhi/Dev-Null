import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const FormItemTextarea = props => {
  const { name, value, onChange, placeholder, errors } = props;

  return (
    <div className="form-group">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className={classnames("form-control", { "is-invalid": errors[name] })}
        placeholder={placeholder}
      />
      <div className="invalid-feedback">{errors[name]}</div>
    </div>
  );
};

FormItemTextarea.defaultProps = {
  errors: {},
  placeholder: ""
};

FormItemTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default FormItemTextarea;
