const validator = require("validator");
const isEmpty = require("./isEmpty");

// module with rules for validation

module.exports = function validateEducation(data) {
  const error = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.school)) {
    error.school = "School is required";
  }
  if (validator.isEmpty(data.degree)) {
    error.school = "Degree is required";
  }
  if (validator.isEmpty(data.fieldofstudy)) {
    error.school = "Fieldofstudy is required";
  }
  if (validator.isEmpty(data.from)) {
    error.school = "*From field* is required";
  }

  return {
    error,
    isValid: isEmpty(error)
  };
};
