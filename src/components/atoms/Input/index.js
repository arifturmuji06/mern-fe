import React from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const Input = ({ label, type = "text", ...rest }) => {
  return (
    <Form.Group className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control type={type} {...rest} />
    </Form.Group>
  );
};

export default Input;
