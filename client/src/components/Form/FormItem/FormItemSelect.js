import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const FormItemSelect = props => {
  const { name, value, onChange, errors, options } = props;

  const renderOptions = options.map(item => {
    return (
      <option key={item.label} value={item.value}>
        {item.label}
      </option>
    );
  });

  return (
    <div className="form-group">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={classnames("form-control", { "is-invalid": errors[name] })}
      >
        {renderOptions}
      </select>
      <div className="invalid-feedback">{errors[name]}</div>
    </div>
  );
};

FormItemSelect.defaultProps = {
  errors: {}
};

FormItemSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  options: PropTypes.array.isRequired
};

export default FormItemSelect;
