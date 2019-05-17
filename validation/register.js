const validator = require("validator");
const isEmpty = require("./isEmpty");

// module with rules for validation registretion data of a new user

module.exports = function validateRegister(data) {
  const error = {}; // will be used like a storage of errors

  const regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/; // for cheching password

  // checks on empty before validation
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // name
  if (!validator.isLength(data.name, { min: 3, max: 30 })) {
    error.name = "Name should be between 3 and 30 charaters";
  }
  if (validator.isEmpty(data.name)) {
    error.name = "Name is required";
  }
  // email
  if (validator.isEmpty(data.email)) {
    error.email = "Email is required";
  }
  if (!validator.isEmail(data.email)) {
    error.email = "Email is incorrect";
  }
  // pasword
  if (validator.isEmpty(data.password)) {
    error.password = "Password is required";
  }
  if (!regExp.test(data.password)) {
    error.password =
      "Password must contain one letter, number, and be longer between 6 and 10 charaters.";
  }
  // equl password
  if (!validator.equals(data.password2, data.password)) {
    error.password2 = "Password is not equal";
  }

  // isValid should be a Boolean type
  return {
    error,
    isValid: isEmpty(error)
  };
};
