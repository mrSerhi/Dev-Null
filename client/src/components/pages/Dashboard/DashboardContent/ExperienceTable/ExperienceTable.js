import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import Button from "../../../../Button/Button";

const ExperienceTable = ({ items }) => {
  const renderingExperienceItems = () => {
    return items.map(exp => {
      const { title, company, from, to } = exp;
      const parseDate = date => format(date, "DD/MM/YYYY");
      const date = `${parseDate(from)} \u2500 ${
        to !== "" ? parseDate(to) : "now"
      }`;

      return (
        <tr key={exp._id}>
          <td className="text-capitalize">{title}</td>
          <td className="text-capitalize">{company}</td>
          <td>{date}</td>
          <td>
            <Button classes="btn-danger btn-sm">
              <FontAwesomeIcon icon="trash" />
            </Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="table-responsive-md">
      <table className="table table-striped">
        <thead className="thead-light">
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{renderingExperienceItems()}</tbody>
      </table>
    </div>
  );
};

ExperienceTable.propTypes = {
  items: PropTypes.array.isRequired
};

export default ExperienceTable;
