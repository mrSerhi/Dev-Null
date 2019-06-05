import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

// actions
import { removeEducationAction } from "../../../../../actions/profileActions";

// components
import Button from "../../../../Button/Button";

class EducationTable extends Component {
  handleOnDelete = expID => this.props.removeEducationAction(expID);

  renderingEducationItems = () => {
    return this.props.items.map(edu => {
      const { school, degree, from, to } = edu;
      const parseDate = date => format(date, "DD/MM/YYYY");
      const date = `${parseDate(from)} \u2500 ${
        to !== "" ? parseDate(to) : "now"
      }`;

      return (
        <tr key={edu._id}>
          <td className="text-capitalize">{school}</td>
          <td className="text-capitalize">{degree}</td>
          <td>{date}</td>
          <td>
            <Button
              classes="btn-danger btn-sm"
              onClick={() => this.handleOnDelete(edu._id)}
            >
              <FontAwesomeIcon icon="trash" />
            </Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <Fragment>
        <div className="h3 display-5">Education</div>

        <div className="table-responsive-md">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>School</th>
                <th>Degree</th>
                <th>Years</th>
                <th />
              </tr>
            </thead>
            {/* <tbody>{this.renderingEducationItems()}</tbody> */}
            {this.renderingEducationItems()}
          </table>
        </div>
      </Fragment>
    );
  }
}

EducationTable.propTypes = {
  items: PropTypes.array.isRequired,
  removeEducationAction: PropTypes.func.isRequired
};

export default connect(
  null,
  { removeEducationAction }
)(EducationTable);
