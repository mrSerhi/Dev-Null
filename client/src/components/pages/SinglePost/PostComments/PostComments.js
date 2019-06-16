import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// components
import Comment from "./Comment";
import Spinner from "../../../UI/Spinner/Spinner";

class PostComments extends Component {
  renderingComments = () => {
    const { post } = this.props.post;
    if (Object.keys(post).length > 0) {
      return post.comments.map(comment => {
        return <Comment key={comment._id} comment={comment} />;
      });
    } else {
      return <Spinner />;
    }
  };
  render() {
    return (
      <section className="post-comments">
        <div className="row">
          <div className="col-md-7 m-auto">
            <hr className="mb-3" />
            {this.renderingComments()}
          </div>
        </div>
      </section>
    );
  }
}

Comment.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ post: state.post });

export default connect(mapStateToProps)(PostComments);
