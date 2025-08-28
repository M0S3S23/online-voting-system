// components/register/AcademicInfoSection.js
import React from "react";
import { Row, Col } from "react-bootstrap";
import { GeoAlt } from "react-bootstrap-icons";
import FormInput from "./FormInput";

const AcademicInfoSection = ({ formData, handleChange }) => (
  <div className="mb-5">
    <div className="d-flex align-items-center mb-3">
      <GeoAlt size={20} className="me-2 text-primary" />
      <h5 className="mb-0">Academic Information</h5>
    </div>
    <Row>
      <Col md={6}>
        <FormInput
          label="Student ID"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
        />
      </Col>
      <Col md={6}>
        <FormInput
          label="School"
          name="school"
          value={formData.school}
          onChange={handleChange}
        />
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <FormInput
          label="Year of Study"
          name="yearOfStudy"
          value={formData.yearOfStudy}
          onChange={handleChange}
        />
      </Col>
      <Col md={6}>
        <FormInput
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
        />
      </Col>
    </Row>
  </div>
);

export default AcademicInfoSection;
