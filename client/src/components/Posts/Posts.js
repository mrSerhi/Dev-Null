import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostsAction } from "../../actions/postActions";

// components
import Modal from "../Layout/Modal/Modal";
import AddPostForm from "./AddPostForm/AddPostForm";
import Button from "../Button/Button";
import Spinner from "../UI/Spinner/Spinner";
import Post from "./Post";

class Posts extends Component {
  state = {
    isOpen: false
  };

  componentDidMount() {
    this.props.getPostsAction();
  }

  handleModalOpenning = () => this.setState({ isOpen: true });
  handleModalClosing = () => this.setState({ isOpen: false });

  renderingPosts = () => {
    const { posts, loading } = this.props.post;

    if (posts.length === null || loading) {
      return <Spinner />;
    } else if (posts.length === 0 && !loading) {
      return (
        <h3 className="text-danger text-center">
          Posts are not created yet, be first and create a post!
        </h3>
      );
    } else {
      return posts.map(post => <Post key={post._id} post={post} />);
    }
  };

  render() {
    return (
      <section className="posts">
        <Modal isOpen={this.state.isOpen} onClose={this.handleModalClosing}>
          <AddPostForm onClose={this.handleModalClosing} />
        </Modal>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <header>
                <h3 className="display-4">Posts</h3>
                <p className="lead">
                  You can create a post or can see what others are discussing
                </p>
                <Button classes="btn-info" onClick={this.handleModalOpenning}>
                  Create post
                </Button>
              </header>

              <div className="post mt-5">{this.renderingPosts()}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPostsAction }
)(Posts);
