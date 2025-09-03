import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  Modal,
} from "react-bootstrap";
import { Upload, PersonCheck, FileText, Award } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";

const CandidateApplicationForm = ({ show, onHide, election, onApplicationSubmit }) => {
  const [formData, setFormData] = useState({
    party: "",
    manifesto: "",
    position: "",
    poster: null,
    fullName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a valid image file (JPEG, PNG, or GIF)");
        return;
      }

      if (file.size > maxSize) {
        setError("File size must be less than 5MB");
        return;
      }

      setFormData(prev => ({
        ...prev,
        poster: file
      }));
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate required fields
      if (!formData.party || !formData.manifesto || !formData.position) {
        throw new Error("Please fill in all required fields");
      }

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('party', formData.party);
      submitData.append('manifesto', formData.manifesto);
      submitData.append('position', formData.position);
      submitData.append('electionId', election._id);
      
      // Add user info if not authenticated
      const token = localStorage.getItem('token');
      if (!token) {
        if (!formData.fullName || !formData.email) {
          throw new Error("Please provide your full name and email");
        }
        submitData.append('fullName', formData.fullName);
        submitData.append('email', formData.email);
      }
      
      if (formData.poster) {
        submitData.append('poster', formData.poster);
      }

      // Set headers with token if available
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`http://localhost:3000/api/elections/${election._id}/apply`, {
        method: 'POST',
        headers: headers,
        body: submitData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit application');
      }

      setSuccess("Application submitted successfully! Please wait for admin approval.");
      
      // Call the callback to update parent component
      if (onApplicationSubmit) {
        onApplicationSubmit();
      }

      // Reset form
      setFormData({
        party: "",
        manifesto: "",
        position: "",
        poster: null,
        fullName: "",
        email: "",
      });

      // Close modal after 2 seconds
      setTimeout(() => {
        onHide();
        setSuccess("");
      }, 2000);

    } catch (err) {
      console.error("Error submitting application:", err);
      setError(err.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  // Add safety check for election
  if (!election) {
    return null;
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <PersonCheck className="me-2" />
          Apply as Candidate - {election?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert variant="success" className="mb-3">
            {success}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {/* User Information for non-authenticated users */}
          {!localStorage.getItem('token') && (
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          )}
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <Award className="me-1" />
                  Party/Affiliation *
                </Form.Label>
                <Form.Control
                  type="text"
                  name="party"
                  value={formData.party}
                  onChange={handleInputChange}
                  placeholder="Enter your party or affiliation"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <PersonCheck className="me-1" />
                  Position *
                </Form.Label>
                <Form.Select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a position</option>
                  {election?.positions?.map((pos, index) => (
                    <option key={index} value={pos.positionName}>
                      {pos.positionName} ({pos.seats} seat{pos.seats > 1 ? 's' : ''})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>
              <FileText className="me-1" />
              Manifesto *
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              name="manifesto"
              value={formData.manifesto}
              onChange={handleInputChange}
              placeholder="Describe your vision, goals, and what you plan to achieve if elected..."
              required
            />
            <Form.Text className="text-muted">
              Minimum 100 characters. Be specific about your plans and qualifications.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>
              <Upload className="me-1" />
              Campaign Poster (Optional)
            </Form.Label>
            <Form.Control
              type="file"
              name="poster"
              onChange={handleFileChange}
              accept="image/*"
            />
            <Form.Text className="text-muted">
              Upload a campaign poster (JPEG, PNG, or GIF, max 5MB)
            </Form.Text>
            {formData.poster && (
              <div className="mt-2">
                <small className="text-success">
                  Selected: {formData.poster.name}
                </small>
              </div>
            )}
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CandidateApplicationForm;
