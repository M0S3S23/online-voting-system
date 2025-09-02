import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Badge, Spinner } from 'react-bootstrap';
import { fetchApplicationStatus } from '../services/elections';

const ApplicationStatus = () => {
  const { id } = useParams();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(null);

  const onCheck = async (e) => {
    e.preventDefault();
    setError('');
    setStatus(null);
    setLoading(true);
    try {
      const res = await fetchApplicationStatus(id, email);
      setStatus(res);
    } catch (e) {
      setError(e.message || 'Failed to fetch status');
    } finally {
      setLoading(false);
    }
  };

  const renderStatus = () => {
    if (!status) return null;
    if (status.status === 'not_found') {
      return <Alert variant="secondary">No application found for this email.</Alert>;
    }
    if (status.status === 'accepted') {
      return (
        <Alert variant="success">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">Application Accepted</h5>
              <div className="small text-muted">Position: {status.details?.position}</div>
            </div>
            <Badge bg="success">Accepted</Badge>
          </div>
          <hr />
          <div className="small">
            <div><strong>Name:</strong> {status.details?.fullName || '-'}</div>
            <div><strong>Email:</strong> {status.details?.email}</div>
            <div><strong>Manifesto:</strong> {status.details?.manifesto}</div>
          </div>
        </Alert>
      );
    }
    return (
      <Alert variant="warning">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">Application Pending Review</h5>
            <div className="small text-muted">Position: {status.details?.position}</div>
          </div>
          <Badge bg="warning" text="dark">Pending</Badge>
        </div>
        <hr />
        <div className="small">
          <div><strong>Name:</strong> {status.details?.fullName || '-'}</div>
          <div><strong>Email:</strong> {status.details?.email}</div>
          <div><strong>Manifesto:</strong> {status.details?.manifesto}</div>
        </div>
      </Alert>
    );
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h3 className="mb-1">Candidate Application Status</h3>
                  <p className="text-muted mb-0">Enter the email used during your application to view status.</p>
                </div>
                <Button as={Link} to={'/vdashboard'} variant="outline-secondary" size="sm">Back to Dashboard</Button>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={onCheck} className="mb-3">
                <Row className="g-3 align-items-end">
                  <Col md={9}>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} className="d-grid">
                    <Button type="submit" variant="primary" disabled={loading}>
                      {loading ? (<span className="d-inline-flex align-items-center"><Spinner size="sm" className="me-2" /> Checking…</span>) : 'Check Status'}
                    </Button>
                  </Col>
                </Row>
              </Form>

              {renderStatus()}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplicationStatus;


