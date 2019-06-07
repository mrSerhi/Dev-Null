import React from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";

const AdditionalExperience = ({ experience }) => {
  const formatDate = date => format(date, "MMM YYYY");

  const renderingExperience = () => {
    return experience.map(exp => {
      const { title, company, location, from, to, description, _id } = exp;
      return (
        <div key={_id} className="card card-body p-3">
          <h4 className="display-5 font-weight-bold text-capitalize">
            {title}
          </h4>
          <p className="experience-date">
            {formatDate(from)} &#9472; {to !== "" ? formatDate(to) : "now"}
          </p>
          <h5 className="text-capitalize">
            <span className="font-weight-bold">Company:</span> {company}
          </h5>
          <h6 className="text-capitalize">
            <span className="font-weight-bold">Location:</span> {location}
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

  return renderingExperience();
};

AdditionalExperience.propTypes = {
  experience: PropTypes.array.isRequired
};

export default AdditionalExperience;
