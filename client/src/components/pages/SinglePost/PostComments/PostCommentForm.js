import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CLEAR_ERRORS } from "../../../../actions/types";
import store from "../../../../store";

// actions
import { addCommentAction } from "../../../../actions/postActions";

// components
import Form from "../../../Form/Form";
import FormItemTextarea from "../../../Form/FormItem/FormItemTextarea";
import Button from "../../../Button/Button";

class PostCommentForm extends Component {
  state = {
    text: "",
    loading: false,
    errors: {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return {
        errors: nextProps.errors
      };
    }

    return null;
  }

  handleChangeOnType = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmitOnClick = e => {
    e.preventDefault();
    this.setState({ loading: true });

    const { user } = this.props.auth;
    const { text } = this.state;
    const { post } = this.props;

    const newComment = {
      user: user.id,
      text: text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addCommentAction(post._id, newComment);

    // clear fields
    this.setState({ text: "", loading: false });

    // clear errors object
    store.dispatch({ type: CLEAR_ERRORS, payload: {} });
  };

  renderingSubmitContentIcon = () => {
    const { loading, errors } = this.state;

    if (loading && Object.keys(errors).length === 0) {
      return (
        <Fragment>
          <span>Adding</span> <FontAwesomeIcon icon="spinner" pulse />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <span>Comment</span> <FontAwesomeIcon icon="paper-plane" />
        </Fragment>
      );
    }
  };

  render() {
    const { text, errors } = this.state;

    return (
      <div className="row mb-3">
        <div className="col-md-7 m-auto">
          <div className="card card-body bg-info">
            <Form onSubmit={this.handleSubmitOnClick}>
              <FormItemTextarea
                name="text"
                value={text}
                onChange={this.handleChangeOnType}
                placeholder="Live comment..."
                errors={errors}
              />
              <Button type="submit" classes="btn-outline-light">
                {this.renderingSubmitContentIcon()}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

PostCommentForm.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  addCommentAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addCommentAction }
)(PostCommentForm);
