import React from "react";
import PropTypes from "prop-types";

// components
import AdditionalExperience from "./AdditionalExperience";
import AdditionalEducation from "./AdditionalEducation";

const ProfileAdditional = ({ profile: { education, experience } }) => {
  return (
    <div className="row mb-5">
      <div className="col-md-6">
        <h2 className="display-5 text-primary">Experience</h2>
        {experience.length > 0 ? (
          <AdditionalExperience experience={experience} />
        ) : (
          <p className="text-danger">No experience added at the moment...</p>
        )}
      </div>

      <div className="col-md-6">
        <h2 className="display-5 text-primary">Education</h2>
        {education.length > 0 ? (
          <AdditionalEducation education={education} />
        ) : (
          <p className="text-danger">No education added at the moment...</p>
        )}
      </div>
    </div>
  );
};

ProfileAdditional.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAdditional;
