// components/register/TermsAndConditions.js
import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const TermsAndConditions = ({ formData, handleChange }) => (
  <Form.Group className="mb-4">
    <Form.Check
      type="checkbox"
      id="agreeTerms"
      name="agreeTerms"
      label={
        <>
          I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
          <Link to="/privacy">Privacy Policy</Link>, and I confirm that all information provided is accurate and truthful.
        </>
      }
      checked={formData.agreeTerms}
      onChange={handleChange}
      required
    />
  </Form.Group>
);

export default TermsAndConditions;
