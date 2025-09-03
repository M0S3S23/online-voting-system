import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { ShieldLock, Eye, EyeSlash, Lock } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from "../contexts/UserContext"; 

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { loginUser } = useUser();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch("http://localhost:3000/reg/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save user in context
      loginUser(data.user);

      // Navigate based on user role
      if (data.user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/vdashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signin-page">
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Card className="shadow-sm p-4" style={{ width: '100%', maxWidth: '500px' }}>
          <div className="text-center mb-4">
            <ShieldLock size={48} className="text-primary" />
          </div>

          <h2 className="text-center mb-2">Sign in to your account</h2>
          <p className="text-center text-muted mb-4">Access your secure voting dashboard</p>

          {error && <p className="text-danger text-center">{error}</p>}

          <Form onSubmit={handleSubmit}>
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
                  type="button"
                >
                  {showPassword ? <EyeSlash /> : <Eye />}
                </Button>
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              <Lock className="me-2" />
              Sign In
            </Button>
{/* Forgot Password and Registration Links */}
<div className="text-center">
  <Link to="/forgot-password" className="text-primary text-decoration-none d-block mb-2">
    Forgot password?
  </Link>
  <span className="text-muted">Don't have an account? </span>
  <Link to="/register" className="text-primary text-decoration-none">
    Register to vote
  </Link>
</div>

          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default SignInPage;
