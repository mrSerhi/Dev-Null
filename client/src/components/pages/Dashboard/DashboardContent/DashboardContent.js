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

      {expItems.length === 0 && eduItems.length === 0 && (
        <p className="lead text-muted">
          Oops, you probably don't have no one of education or experience in
          your profile! Add one of them to your profile and you will see your
          information in this place...
        </p>
      )}

      {expItems.length > 0 && <ExperienceTable items={expItems} />}

      {eduItems.length > 0 && <EducationTable items={eduItems} />}

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
