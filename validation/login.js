const validator = require("validator");
const isEmpty = require("./isEmpty");

// module with validation rules for checking login

module.exports = function validationLogin(data) {
  const error = {}; // will be used like a storage of errors

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // email
  if (!validator.isEmail(data.email)) {
    error.email = "Email is incorrect";
  }
  if (validator.isEmpty(data.email)) {
    error.email = "Email is required";
  }

  // password
  if (validator.isEmpty(data.password)) {
    error.password = "Password is required";
  }

  return {
    error,
    isValid: isEmpty(error)
  };
};
