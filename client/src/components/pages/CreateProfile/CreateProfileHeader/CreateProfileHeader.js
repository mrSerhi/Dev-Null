import React from "react";

const CreateProfileHeader = () => {
  return (
    <div className="header mb-3">
      <h1 className="display-5 text-center">Create Profile</h1>
      <p className="text-center lead">
        In this page you can create your own profile. Please, fill in the fields
        to make your profile look perfect!
      </p>
      <small>
        fields with <span className="text-danger">*</span> - are required
      </small>
    </div>
  );
};

export default CreateProfileHeader;
