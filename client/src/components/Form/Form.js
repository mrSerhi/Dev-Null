import React from "react";

const Form = props => {
  return (
    <form noValidate={props.noValidate} onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
};

export default Form;
