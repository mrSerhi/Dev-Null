import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Post extends Component {
  renderingDeletePostBtn = () => {
    const { user } = this.props.auth;
    const { user: userID } = this.props.post;
    if (user.id === userID) {
      return (
        <Button classes="btn-sm btn-danger text-light float-right">
          <FontAwesomeIcon icon="times" />
        </Button>
      );
    }

    return null;
  };

  render() {
    const {
      comments,
      likes,
      text,
      _id: postID,
      avatar,
      name
    } = this.props.post;

    return (
      <div className="card card-body mb-3 bg-light p-4">
        <div className="row">
          <div className="d-none d-md-block col-md-2">
            <Link to="/profiles">
              <img src={avatar} alt="avatar" className="rounded-circle" />
            </Link>

            <h5 className="text-center mt-2 text-uppercase">{name}</h5>
          </div>

          <div className="col-md-10">
            {this.renderingDeletePostBtn()}
            <p className="lead mb-5">{text}</p>

            <Button classes="btn-light text-danger">
              <FontAwesomeIcon icon="heart" size="2x" />{" "}
              <span className="badge badge-info">{likes.length}</span>
            </Button>
            <Button classes="btn-light ml-1">
              <FontAwesomeIcon icon="heart-broken" size="1x" />
            </Button>

            <Link to={`/post/${postID}`} className="btn btn-info ml-5">
              Add Comment{" "}
              <span className="badge badge-warning">{comments.length}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Post);
