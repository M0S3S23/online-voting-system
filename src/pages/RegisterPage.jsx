import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { Person, ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import PersonalInfoSection from "../components/form/PersonalInfo";
import AcademicInfoSection from "../components/form/AcademicInfo";
import TermsAndConditions from "../components/form/TermsAndConditions";
import SecurityNoticeCard from "../components/form/SecurityNoticeCard"; // ✅ make sure this exists

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    studentId: "", school: "", yearOfStudy: "", department: "",
    password: "", confirmPassword: "", agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const isFormValid =
    formData.password.length >= 8 &&
    formData.password === formData.confirmPassword &&
    formData.agreeTerms;

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/reg/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(async res => {
        const data = await res.json();
        if (res.status === 201) {
          window.location.href = "/signin";
        } else {
          alert(data.message || "Registration failed. Please try again.");
        }
        // Optionally handle success/failure here
      })
      .catch(err => {
        console.error("Registration error:", err);
      });
    console.log("Registration data:", formData);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Link to="/" className="text-decoration-none d-block mb-3">
            <ArrowLeft className="me-1" /> Back to Home
          </Link>

          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white">
              <div className="d-flex align-items-center">
                <Person size={24} className="me-2" />
                <h4 className="mb-0">Voter Registration</h4>
              </div>
              <small className="d-block mt-1">All fields are required for secure voter verification</small>
            </Card.Header>

            <Card.Body className="p-4">
              <h2 className="mb-2">Create Your Account</h2>
              <p className="text-muted mb-4">
                Join our secure voting platform and participate in democratic processes.
              </p>

              <Form onSubmit={handleSubmit}>
                <PersonalInfoSection formData={formData} handleChange={handleChange} />
                <AcademicInfoSection formData={formData} handleChange={handleChange} />

                {/* 🔑 Security Info inline here */}
                <div className="mb-5">
                  <div className="d-flex align-items-center mb-3">
                    <Person size={20} className="me-2 text-primary" />
                    <h5 className="mb-0">Security Information</h5>
                  </div>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Inline validation */}
                  {(formData.password && formData.confirmPassword) && (
                    <>
                      {formData.password !== formData.confirmPassword && (
                        <Alert variant="danger" className="py-2">
                          Passwords do not match.
                        </Alert>
                      )}
                      {formData.password.length > 0 && formData.password.length < 8 && (
                        <Alert variant="danger" className="py-2">
                          Password must be at least 8 characters.
                        </Alert>
                      )}
                    </>
                  )}
                </div>

                <SecurityNoticeCard />
                <TermsAndConditions formData={formData} handleChange={handleChange} />

                <div className="d-grid gap-3">
                  <Button variant="primary" size="lg" type="submit" disabled={!isFormValid}>
                    <Person className="me-2" /> Create Account
                  </Button>
                  <div className="text-center">
                    <span className="text-muted me-2">Already have an account?</span>
                    <Link to="/signin" className="text-decoration-none">Sign In</Link>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
