import React from "react";

const EditProfileHeader = () => {
  return (
    <div className="header mb-3">
      <h1 className="display-5 text-center">Edit Profile</h1>
      <p className="text-center lead text-info">
        On this page you can make changes to your profile.
      </p>
      <small>
        fields with <span className="text-danger">*</span> - are required
      </small>
    </div>
  );
};

export default EditProfileHeader;
