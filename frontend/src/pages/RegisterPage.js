import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Person, GeoAlt, ShieldLock, InfoCircle, ArrowLeft } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    nationalId: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration data:', formData);
  };

  return (
    <div className="register-page bg-light">
      <Header />

      {/* Main Content */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            {/* Back Link */}
            <Link to="/" className="text-decoration-none d-block mb-3">
              <ArrowLeft className="me-1" /> Back to Home
            </Link>

            {/* Registration Card */}
            <Card className="shadow-sm border-0">
              {/* Voter Registration Banner */}
              <Card.Header className="bg-primary text-white">
                <div className="d-flex align-items-center">
                  <Person size={24} className="me-2" />
                  <h4 className="mb-0">Voter Registration</h4>
                </div>
                <small className="d-block mt-1">All fields are required for secure voter verification</small>
              </Card.Header>

              <Card.Body className="p-4">
                {/* Heading */}
                <h2 className="mb-2">Create Your Account</h2>
                <p className="text-muted mb-4">Join our secure voting platform and participate in democratic processes.</p>

                <Form onSubmit={handleSubmit}>
                  {/* Personal Information */}
                  <div className="mb-5">
                    <div className="d-flex align-items-center mb-3">
                      <Person size={20} className="me-2 text-primary" />
                      <h5 className="mb-0">Personal Information</h5>
                    </div>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Date of Birth</Form.Label>
                          <Form.Control
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>National ID / SSN</Form.Label>
                          <Form.Control
                            type="text"
                            name="nationalId"
                            value={formData.nationalId}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>

                  {/* Address Information */}
                  <div className="mb-5">
                    <div className="d-flex align-items-center mb-3">
                      <GeoAlt size={20} className="me-2 text-primary" />
                      <h5 className="mb-0">Address Information</h5>
                    </div>
                    <Form.Group className="mb-3">
                      <Form.Label>Street Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>State</Form.Label>
                          <Form.Control
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>ZIP Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </div>

                  {/* Security Information */}
                  <div className="mb-5">
                    <div className="d-flex align-items-center mb-3">
                      <ShieldLock size={20} className="me-2 text-primary" />
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
                  </div>

                  {/* Security & Privacy Notice */}
                  <Alert variant="info" className="mb-4">
                    <div className="d-flex">
                      <InfoCircle size={20} className="me-2 mt-1" />
                      <div>
                        <h6 className="mb-2">Security & Privacy Notice</h6>
                        <ul className="small mb-0">
                          <li>All personal information is encrypted</li>
                          <li>Multi-factor authentication required for voting</li>
                          <li>Voting records are anonymous</li>
                          <li>Compliant with election security standards</li>
                        </ul>
                      </div>
                    </div>
                  </Alert>

                  {/* Terms and Conditions */}
                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      label={
                        <>
                          I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
                          <Link to="/privacy">Privacy Policy</Link>, and I confirm that all information provided is accurate and truthful.
                        </>
                      }
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  {/* Action Buttons */}
                  <div className="d-grid gap-3">
                    <Button variant="primary" size="lg" type="submit">
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
    </div>
  );
};

export default RegisterPage;