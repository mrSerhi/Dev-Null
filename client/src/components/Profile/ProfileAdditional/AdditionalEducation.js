import React from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";

const AdditionalEducation = ({ education }) => {
  const formatDate = date => format(date, "MMM YYYY");

  const renderingEducation = () => {
    return education.map(edu => {
      const { school, degree, fieldofstudy, from, to, description } = edu;
      return (
        <div className="card card-body p-3">
          <h4 className="display-5 font-weight-bold">{school}</h4>
          <p className="education-date">
            {formatDate(from)} &#9472; {to !== "" ? formatDate(to) : "now"}
          </p>
          <h5>
            <span className="font-weight-bold">Degree:</span> {degree}
          </h5>
          <h6>
            <span className="font-weight-bold">Field Of Study:</span>{" "}
            {fieldofstudy}
          </h6>

          {description !== "" ? (
            <p>
              <span className="font-weight-bold">Description:</span>{" "}
              {description}
            </p>
          ) : null}
        </div>
      );
    });
  };

  return renderingEducation();
};

AdditionalEducation.propTypes = {
  education: PropTypes.array.isRequired
};

export default AdditionalEducation;
