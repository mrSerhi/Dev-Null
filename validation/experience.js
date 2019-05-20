const validator = require("validator");
const isEmpty = require("./isEmpty");

// module with rules for validation

module.exports = function validationExperience(data) {
  const error = {};

  // checking required properties
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  // title
  if (validator.isEmpty(data.title)) {
    error.title = "Title is required";
  }

  // company
  if (validator.isEmpty(data.company)) {
    error.company = "Company is required";
  }

  // from
  if (validator.isEmpty(data.from)) {
    error.from = "*From field* is required";
  }

  return {
    error,
    isValid: isEmpty(error)
  };
};
