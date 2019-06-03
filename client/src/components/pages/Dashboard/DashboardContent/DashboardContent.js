import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

// components
import DashHeader from "./DashHeader/DashHeader";
import DashLinksGroup from "./DashLinksGroup/DashLinksGroup";
import Button from "../../../Button/Button";

const DashboardContent = ({ onDelete }) => {
  return (
    <Fragment>
      <DashHeader />
      <DashLinksGroup />

      {/* TODO: add  Education table */}
      {/* TODO: add  Exp table */}
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
