// components/register/PersonalInfoSection.js
import React from "react";
import { Row, Col } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";
import FormInput from "./FormInput";

const PersonalInfoSection = ({ formData, handleChange }) => (
  <div className="mb-5">
    <div className="d-flex align-items-center mb-3">
      <Person size={20} className="me-2 text-primary" />
      <h5 className="mb-0">Personal Information</h5>
    </div>
    <Row>
      <Col md={6}>
        <FormInput label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
      </Col>
      <Col md={6}>
        <FormInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <FormInput label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} />
      </Col>
      <Col md={6}>
        <FormInput label="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleChange} />
      </Col>
    </Row>
  </div>
);

export default PersonalInfoSection;
