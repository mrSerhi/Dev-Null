import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../Button/Button";
import { connect } from "react-redux";
import { format } from "date-fns";
import PropTypes from "prop-types";
import classnames from "classnames";

// action
import { removeCommentAction } from "../../../../actions/postActions";

class Comment extends Component {
  state = {
    removing: false
  };

  handleDeleteCommentOnClick = (postID, commentID) => {
    this.setState({ removing: true });
    // delay for animation
    setTimeout(() => {
      this.props.removeCommentAction(postID, commentID);
    }, 700);
  };

  renderingDeletePostBtn = () => {
    const { user } = this.props.auth;
    const { user: userID, _id: commentID } = this.props.comment;
    const { _id: postID } = this.props.post;

    if (user.id === userID) {
      return (
        <Button
          onClick={() => this.handleDeleteCommentOnClick(postID, commentID)}
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
    const { removing } = this.state;
    return (
      <div
        className={classnames("card card-body bg-light mb-3 animated", {
          fadeOut: removing
        })}
      >
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
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  removeCommentAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  { removeCommentAction }
)(Comment);
