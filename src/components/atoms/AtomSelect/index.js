import React from "react";
import { Form } from "react-bootstrap";

const AtomSelect = ({ label, name, value, onChange, options, className }) => {
  return (
    <Form.Group className={`mb-3 ${className}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Select name={name} value={value} onChange={onChange}>
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default AtomSelect;
