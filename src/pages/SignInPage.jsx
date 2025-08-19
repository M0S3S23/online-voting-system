import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { ShieldLock, Eye, EyeSlash, Lock } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log('Signing in with:', formData);
    navigate("/vdashboard");
  };

  return (
    <div className="signin-page">
      {/* Navigation Bar */}
      <nav className="navbar navbar-dark bg-dark">
        <Container>
          <span className="navbar-brand fw-bold">VoteSecure</span>
          <div className="d-flex">
            <Link to="/signin" className="btn btn-outline-light me-2 disabled">Sign In</Link>
            <Link to="/register" className="btn btn-primary">Register to Vote</Link>
          </div>
        </Container>
      </nav>

      {/* Main Content */}
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Card className="shadow-sm p-4" style={{ width: '100%', maxWidth: '500px' }}>
          {/* Security Icon */}
          <div className="text-center mb-4">
            <ShieldLock size={48} className="text-primary" />
          </div>

          {/* Heading */}
          <h2 className="text-center mb-2">Sign in to your account</h2>
          <p className="text-center text-muted mb-4">Access your secure voting dashboard</p>

          {/* Sign In Form */}
          <Form onSubmit={handleSubmit}>
            {/* Email Field */}
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  variant="link"
                  className="position-absolute end-0 top-50 translate-middle-y"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlash /> : <Eye />}
                </Button>
              </div>
            </Form.Group>

            {/* Sign In Button */}
            <Button variant="primary" type="submit" className="w-100 mb-3">
              <Lock className="me-2" />
              Sign In
            </Button>

            {/* Registration Link */}
            <p className="text-center">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary text-decoration-none">
                Register to vote
              </Link>
            </p>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default SignInPage;