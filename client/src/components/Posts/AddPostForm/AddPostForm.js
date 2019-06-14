import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CLEAR_ERRORS } from "../../../actions/types";
import store from "../../../store";

// actions
import { addPostAction } from "../../../actions/postActions";

// components
import Form from "../../Form/Form";
import FormItemTextarea from "../../Form/FormItem/FormItemTextarea";
import Button from "../../Button/Button";

class AddPostForm extends Component {
  state = {
    text: "",
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

    const { user } = this.props.auth;
    const { text, errors } = this.state;

    const newPost = {
      user: user.id,
      text: text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPostAction(newPost);

    // close modal
    if (Object.keys(errors).length === 0 && text !== "") this.props.onClose();

    // clear fields
    this.setState({ text: "" });

    // clear errors object
    store.dispatch({ type: CLEAR_ERRORS, payload: {} });
  };

  render() {
    const { text, errors } = this.state;

    return (
      <Form onSubmit={this.handleSubmitOnClick}>
        <h3 className="mb-3 text-center">Type some interesting</h3>
        <FormItemTextarea
          name="text"
          value={text}
          onChange={this.handleChangeOnType}
          placeholder="Your Message..."
          errors={errors}
        />
        <Button type="submit" classes="btn-light">
          Post <FontAwesomeIcon icon="paper-plane" />
        </Button>
      </Form>
    );
  }
}

AddPostForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  addPostAction: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPostAction }
)(AddPostForm);
