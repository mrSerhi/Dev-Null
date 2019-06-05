import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

// components
import DashHeader from "./DashHeader/DashHeader";
import DashLinksGroup from "./DashLinksGroup/DashLinksGroup";
import Button from "../../../Button/Button";
import ExperienceTable from "./ExperienceTable/ExperienceTable";
import EducationTable from "./EducationTable/EducationTable";

const DashboardContent = ({ onDelete, expItems, eduItems }) => {
  return (
    <Fragment>
      <DashHeader />
      <DashLinksGroup />

      <ExperienceTable items={expItems} />

      <EducationTable items={eduItems} />

      <Button classes="btn-sm btn-danger" onClick={onDelete}>
        Delete my account <FontAwesomeIcon icon="trash" />
      </Button>
    </Fragment>
  );
};

DashboardContent.propTypes = {
  onDelete: PropTypes.func.isRequired
};

export default DashboardContent;
