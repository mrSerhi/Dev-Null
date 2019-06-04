import React from "react";

const ExperienceHeader = () => {
  return (
    <header>
      <h1 className="display-4 text-center">Your Experience</h1>
      <p className="lead text-info text-center">
        You can add your own professional experience
      </p>
      <small>
        fields with <span className="text-danger">*</span> - are requred
      </small>
    </header>
  );
};

export default ExperienceHeader;
