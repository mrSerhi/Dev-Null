import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// actions
import { getCurrentPostAction } from "../../../actions/postActions";

// components
import Spinner from "../../UI/Spinner/Spinner";
import SinglePostView from "./SinglePostItem";
import GoBackLink from "../../UI/GoBackLink/GoBackLink";
import CommentsFeedForm from "./CommentsFeed/CommentsFeedForm";
import CommentsFeed from "./CommentsFeed/CommentsFeed";

class SinglePost extends Component {
  componentDidMount() {
    const {
      params: { postID }
    } = this.props.match;

    this.props.getCurrentPostAction(postID);
  }

  renderingSinglePost = () => {
    const { post, loading } = this.props.post;

    if (post === null || loading) {
      return <Spinner />;
    } else {
      return (
        <Fragment>
          <GoBackLink path="/posts" />
          <SinglePostView post={post} />
          <CommentsFeedForm post={post} />
          <CommentsFeed />
        </Fragment>
      );
    }
  };

  render() {
    return (
      <section className="current-post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{this.renderingSinglePost()}</div>
          </div>
        </div>
      </section>
    );
  }
}

SinglePost.propTypes = {
  post: PropTypes.object.isRequired,
  getCurrentPostAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ post: state.post });

export default connect(
  mapStateToProps,
  { getCurrentPostAction }
)(SinglePost);
