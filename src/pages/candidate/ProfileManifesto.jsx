import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useUser } from '../../contexts/UserContext';

const ProfileManifesto = () => {
  const { user } = useUser();
  const [manifesto, setManifesto] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchManifesto = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/api/candidates/applications/my', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch manifesto.');
        }
        const applications = await response.json();
        const approvedApp = applications.find(app => app.status === 'Approved');
        if (approvedApp) {
          setManifesto(approvedApp.manifesto);
        } else {
          setError('You do not have an approved application to view a manifesto.');
        }
      } catch (err) {
        console.error('Error fetching manifesto:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchManifesto();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // This section needs a dedicated backend PUT endpoint to function.
    setSuccess('Manifesto update logic is a placeholder. It would be handled by a PUT request.');
    setIsEditing(false); // Assume successful for now
    setLoading(false);
  };

  if (loading) {
    return <Spinner animation="border" className="m-auto d-block" />;
  }

  return (
    <div className="candidate-profile-page">
      <h2>Profile & Manifesto</h2>
      <p className="lead">Review and update your candidate profile and manifesto.</p>
      <hr />
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>Your Manifesto</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Manifesto Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={manifesto}
                onChange={(e) => setManifesto(e.target.value)}
                readOnly={!isEditing}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              {isEditing ? (
                <>
                  <Button variant="secondary" onClick={() => setIsEditing(false)} className="me-2" disabled={loading}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Save Changes'}
                  </Button>
                </>
              ) : (
                <Button variant="primary" onClick={() => setIsEditing(true)} disabled={error}>
                  Edit Manifesto
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileManifesto;