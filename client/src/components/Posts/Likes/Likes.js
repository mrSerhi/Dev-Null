import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// actions
import {
  addLikeToPostAction,
  removeLikeFromPostAction
} from "../../../actions/postActions";

// components
import Button from "../../Button/Button";

class Likes extends Component {
  // bug: auth user can del all likes when double clicked on unlike and after that clicked on like
  // fix: disabled unlike btn when user is clicked on it
  state = {
    disabled: false
  };

  handleLikeOnClick = postID => {
    this.props.addLikeToPostAction(postID);

    this.setState({ disabled: false });
  };
  handleUnlikeOnClick = postID => {
    this.props.removeLikeFromPostAction(postID);

    this.setState({ disabled: true });
  };

  // check if current user is liked the post
  checkOnLiked = () => {
    const { user } = this.props.auth;
    const { likes } = this.props.post;
    const countLikes = likes.filter(like => like.user === user.id);
    let isLiked;

    if (countLikes.length > 0) {
      isLiked = true;
    } else {
      isLiked = false;
    }

    return isLiked;
  };

  render() {
    const { likes, _id: postID } = this.props.post;
    const iconLiked = !this.checkOnLiked() ? ["far", "heart"] : "heart";

    return (
      <Fragment>
        <Button
          classes="btn-link text-decoration-none text-danger"
          onClick={() => this.handleLikeOnClick(postID)}
        >
          <FontAwesomeIcon icon={iconLiked} size="2x" />{" "}
          <sup className="h6 font-weight-bold">{likes.length}</sup>
        </Button>
        <Button
          classes="btn-link text-decoration-none text-dark ml-1"
          onClick={() => this.handleUnlikeOnClick(postID)}
          disabled={this.state.disabled}
        >
          <FontAwesomeIcon icon="heart-broken" size="2x" />
        </Button>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });

Likes.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLikeToPostAction: PropTypes.func.isRequired,
  removeLikeFromPostAction: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { addLikeToPostAction, removeLikeFromPostAction }
)(Likes);
