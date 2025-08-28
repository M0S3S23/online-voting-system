// components/common/FormInput.js
import React from "react";
import { Form } from "react-bootstrap";

const FormInput = ({ label, type="text", name, value, onChange, required=true, placeholder }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </Form.Group>
  );
};

export default FormInput;
