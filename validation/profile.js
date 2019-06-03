const validator = require("validator");
const isEmpty = require("./isEmpty");

// module with validation ruls for Profile fields

module.exports = function validationProfile(data) {
  const error = {}; // use like a storage for errors

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";
  data.status = !isEmpty(data.status) ? data.status : "";

  // handle
  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    error.handle = "Handle must be between 2 and 4 charaters";
  }
  if (validator.isEmpty(data.handle)) {
    error.handle = "Profile handle is required";
  }

  // status
  if (validator.isEmpty(data.status)) {
    error.status = "Status is required";
  }

  // skills
  if (validator.isEmpty(data.skills)) {
    error.skills = "Skills is required";
  }

  // validate URLs

  // website
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      error.website = "Website URL is inccorect";
    }
  }

  // social youtube
  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      error.youtube = "Youtube URL is inccorect";
    }
  }

  // social twitter
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      error.twitter = "Twitter URL is inccorect";
    }
  }

  // social facebook
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      error.facebook = "Facebook URL is inccorect";
    }
  }

  // social linkedin
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      error.linkedin = "Linkedin URL is inccorect";
    }
  }

  // social instagram
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      error.instagram = "Instagram URL is inccorect";
    }
  }

  return {
    error,
    isValid: isEmpty(error)
  };
};
