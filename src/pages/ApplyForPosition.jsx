import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { fetchElectionPositions, submitApplication, fetchElections } from '../services/elections';

const ApplyForPosition = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    position: '',
    manifesto: ''
  });

  useEffect(() => {
    const loadPositions = async () => {
      try {
        // If the id in the URL is not a valid MongoDB ObjectId, try to get the first election and redirect
        const isLikelyObjectId = typeof id === 'string' && /^[a-f\d]{24}$/i.test(id);
        if (!isLikelyObjectId) {
          const elections = await fetchElections();
          if (Array.isArray(elections) && elections.length > 0) {
            navigate(`/elections/${elections[0]._id}/apply`, { replace: true });
            return;
          }
          throw new Error('No elections available');
        }

        const data = await fetchElectionPositions(id);
        setPositions(data || []);
        if (data && data.length > 0) {
          setFormData((prev) => ({ ...prev, position: data[0].positionName }));
        }
      } catch (e) {
        setError(e.message || 'Failed to load positions');
      } finally {
        setLoading(false);
      }
    };
    loadPositions();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await submitApplication(id, formData);
      setSuccess('Application submitted successfully');
      setFormData({ fullName: '', email: '', position: positions[0]?.positionName || '', manifesto: '' });
    } catch (e) {
      setError(e.message || 'Failed to submit');
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h3 className="mb-1">Apply to Stand for Election</h3>
                  <p className="text-muted mb-0">Fill in your details to apply as a candidate.</p>
                </div>
                <Button as={Link} to={`/elections/${id}/application-status`} variant="outline-primary" size="sm">View Application Status</Button>
              </div>

              {loading && (
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Spinner animation="border" size="sm" />
                  <span>Loading positions…</span>
                </div>
              )}
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="fullName">
                      <Form.Label>Full name</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="position">
                      <Form.Label>Position</Form.Label>
                      <Form.Select
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        disabled={loading || positions.length === 0}
                        required
                      >
                        {positions.map((p) => (
                          <option key={p.positionName} value={p.positionName}>{p.positionName}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="manifesto">
                      <Form.Label>Manifesto</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        name="manifesto"
                        value={formData.manifesto}
                        onChange={handleChange}
                        placeholder="Outline your vision and plans"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-between mt-3">
                  <Button as={Link} to={'/vdashboard'} variant="outline-secondary">Home</Button>
                  <Button type="submit" variant="primary" disabled={loading || positions.length === 0}>
                    Submit Application
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplyForPosition;


