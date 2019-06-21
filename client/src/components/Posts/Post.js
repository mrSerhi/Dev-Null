import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";

// actions
import { deletePostAction } from "../../actions/postActions";

// components
import Button from "../Button/Button";
import Likes from "./Likes/Likes";

class Post extends Component {
  state = {
    removing: false
  };

  handleDeleteOnClick = postID => {
    this.setState(prevState => ({ removing: !prevState.removing }));

    setTimeout(() => this.props.deletePostAction(postID), 1000); // for animation
  };

  renderingDeletePostBtn = () => {
    const { user } = this.props.auth;
    const { user: userID, _id: PostID } = this.props.post;

    if (user.id === userID) {
      return (
        <Button
          onClick={() => this.handleDeleteOnClick(PostID)}
          classes="btn-sm btn-danger text-light float-right ml-2"
        >
          <FontAwesomeIcon icon="times" />
        </Button>
      );
    }

    return null;
  };

  renderingPost = () => {
    const { comments, text, _id: postID, avatar, name } = this.props.post;
    const { removing } = this.state;
    let post = "card card-body mb-3 bg-light p-4 animated ";

    return (
      <div
        className={classnames(post, {
          bounceOutRight: removing,
          bounceIn: !removing
        })}
      >
        <div className="row">
          <div className="col-sm-12 col-md-2">
            <Link to="/profiles" className="d-none d-md-block">
              <img src={avatar} alt="avatar" className="rounded-circle" />
            </Link>

            <h5 className="text-center mt-2 text-uppercase text-warning">
              {name}
            </h5>
          </div>

          <div className="col-md-10">
            {this.renderingDeletePostBtn()}

            <p className="lead mb-5">{text}</p>

            <Likes post={this.props.post} />

            <Link to={`/post/${postID}`} className="btn btn-info ml-5">
              Add Comment{" "}
              <span className="badge badge-warning">{comments.length}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this.renderingPost();
  }
}

Post.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  deletePostAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePostAction }
)(Post);
