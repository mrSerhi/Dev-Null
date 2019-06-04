import React from "react";
import PropTypes from "prop-types";

const FormItemCheckbox = props => {
  const { name, checkboxID, value, checked, onChecked, label } = props;

  return (
    <div className="form-check mb-3">
      <input
        name={name || checkboxID}
        className="form-check-input"
        type="checkbox"
        value={value}
        id={checkboxID}
        checked={checked}
        onChange={onChecked}
      />

      <label className="form-check-label" htmlFor={checkboxID}>
        {label}
      </label>
    </div>
  );
};

FormItemCheckbox.propTypes = {
  name: PropTypes.string,
  checkboxID: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  checked: PropTypes.bool,
  onChecked: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default FormItemCheckbox;
