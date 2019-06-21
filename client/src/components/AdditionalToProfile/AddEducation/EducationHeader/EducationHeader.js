import React from "react";

const EducationHeader = () => {
  return (
    <header>
      <h1 className="display-4 text-center">Your Education</h1>
      <p className="lead text-info text-center">
        Here you can add your education: school, courses etc...
      </p>
      <small>
        fields with <span className="text-danger">*</span> - are requred
      </small>
    </header>
  );
};

export default EducationHeader;
