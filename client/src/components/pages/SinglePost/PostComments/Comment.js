import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../Button/Button";
import { connect } from "react-redux";
import { format } from "date-fns";
import PropTypes from "prop-types";

class Comment extends Component {
  renderingDeletePostBtn = () => {
    const { user } = this.props.auth;
    const { user: userID } = this.props.comment;

    if (user.id === userID) {
      return (
        <Button
          // onClick={() => this.handleDeleteOnClick(PostID)}
          classes="btn-link text-danger text-decoration-none float-right ml-1"
        >
          <FontAwesomeIcon icon="times" />
        </Button>
      );
    }

    return null;
  };

  render() {
    const { comment } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="media">
          <img
            src={comment.avatar}
            alt="avatar"
            className="rounded-circle mr-3"
            style={{ maxWidth: "45px" }}
          />

          <div className="media-body">
            {this.renderingDeletePostBtn()}
            <h5 className="text-info text-capitalize mb-0">{comment.name}</h5>
            <small className="text-muted">
              {format(comment.date, "D-MM-YYYY H:mm")}
            </small>

            <p className="lead">{comment.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(Comment);
