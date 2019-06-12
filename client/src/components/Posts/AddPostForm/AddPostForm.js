import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

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
    const { text } = this.state;

    const newPost = {
      user: user.id,
      text: text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPostAction(newPost);

    // close modal
    this.props.onClose();

    // clear fields
    this.setState({ text: "" });
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

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPostAction }
)(AddPostForm);
