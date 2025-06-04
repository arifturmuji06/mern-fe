import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const AtomButton = ({ label }) => {
  return (
    <div>
      <Button>{label}</Button>
    </div>
  );
};

export default AtomButton;
