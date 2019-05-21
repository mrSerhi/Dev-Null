const validator = require("validator");
const isEmpty = require("./isEmpty");

// modul with rules for validation

module.exports = function validatePost(data) {
  const error = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 10, max: 300 })) {
    error.text = "Text field must be between 10 and 300 charaters";
  }

  if (validator.isEmpty(data.text)) {
    error.text = "Text field is required";
  }

  return {
    error,
    isValid: isEmpty(error)
  };
};
