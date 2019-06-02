import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormItemSocial = props => {
  const { name, value, onChange, placeholder, errors, icon } = props;

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <FontAwesomeIcon icon={icon} />
        </span>
      </div>

      <input
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

FormItemSocial.defaultProps = {
  errors: {},
  type: "text",
  placeholder: ""
};

FormItemSocial.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  errors: PropTypes.object,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};

export default FormItemSocial;
