import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostsAction } from "../../actions/postActions";

// components
import Modal from "../Layout/Modal/Modal";
import AddPostForm from "./AddPostForm/AddPostForm";
import Button from "../Button/Button";

class Posts extends Component {
  state = {
    isOpen: false
  };

  handleModalOpenning = () => this.setState({ isOpen: true });
  handleModalClosing = () => this.setState({ isOpen: false });

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
              Posts container
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
