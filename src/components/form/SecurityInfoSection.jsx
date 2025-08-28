// components/register/SecurityInfoSection.js
import React from "react";
import { Row, Col, Alert } from "react-bootstrap";
import { ShieldLock } from "react-bootstrap-icons";
import FormInput from "./FormInput";

const SecurityInfoSection = ({ formData, handleChange }) => (
  <div className="mb-5">
    <div className="d-flex align-items-center mb-3">
      <ShieldLock size={20} className="me-2 text-primary" />
      <h5 className="mb-0">Security Information</h5>
    </div>
    <Row>
      <Col md={6}>
        <FormInput
          label="Password"
          type="password"
          name="password"
          placeholder="Create a strong password"
          value={formData?.password || ""}
          onChange={handleChange}
        />
      </Col>
      <Col md={6}>
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData?.confirmPassword || ""}
          onChange={handleChange}
        />
      </Col>
    </Row>

    {/* Inline Validation Messages */}
    {(formData?.password && formData.confirmPassword) && (
      <>
        {formData?.password !== formData?.confirmPassword && (
          <Alert variant="danger" className="py-2">
            Passwords do not match.
          </Alert>
        )}
        {formData?.password.length > 0 && formData?.password.length < 8 && (
          <Alert variant="danger" className="py-2">
            Password must be at least 8 characters.
          </Alert>
        )}
      </>
    )}
  </div>
);

export default SecurityInfoSection;
