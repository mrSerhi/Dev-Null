import React, { Fragment } from "react";

// components
import DashHeader from "./DashHeader/DashHeader";
import DashLinksGroup from "./DashLinksGroup/DashLinksGroup";

const DashboardContent = () => {
  return (
    <Fragment>
      <DashHeader />
      <DashLinksGroup />

      {/* TODO: add  Education table */}
      {/* TODO: add  Exp table */}
    </Fragment>
  );
};

export default DashboardContent;
