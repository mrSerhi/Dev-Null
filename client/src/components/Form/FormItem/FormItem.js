import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

// tip below email field
const tip = (
  <small className="form-text text-muted">
    This site uses Gravatar so if you want a profile image, use a Gravatar email
  </small>
);

const FormItem = props => {
  const { name, value, onChange, placeholder, errors, type } = props;

  return (
    <div className="form-group">
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className={classnames("form-control", { "is-invalid": errors[name] })}
        placeholder={placeholder}
      />
      {type === "email" && !errors.email ? tip : null}
      <div className="invalid-feedback">{errors[name]}</div>
    </div>
  );
};

FormItem.defaultProps = {
  errors: {},
  type: "text",
  placeholder: ""
};

FormItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  errors: PropTypes.object,
  type: PropTypes.string
};

export default FormItem;
