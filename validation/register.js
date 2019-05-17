const validator = require("validator");
const isEmpty = require("./isEmpty");

// module with rules for validation registretion data of a new user

module.exports = function validateRegister(data) {
  const error = {}; // will be used like a storage of errors

  if (!validator.isLength(data.name, { min: 3, max: 30 })) {
    error.name = "Name should be between 3 and 30 characters";
  }

  // isValid should be a Boolean type
  return {
    error,
    isValid: isEmpty(error)
  };
};
