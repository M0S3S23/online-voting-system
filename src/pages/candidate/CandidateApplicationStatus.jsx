import React, { useEffect, useState } from 'react';
import { Card, Alert, Spinner, Badge } from 'react-bootstrap';
import { useUser } from '../../contexts/UserContext';
import { format } from 'date-fns';

const CandidateApplicationStatus = () => {
  const { user } = useUser();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/api/candidates/applications/my', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch applications.');
        }
        const data = await response.json();
        setApplications(data);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Rejected':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="my-5 text-center">
        <Spinner animation="border" />
        <p>Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="candidate-applications-page">
      <h2>Application Status</h2>
      <p className="lead">Here you can view the status of all your candidate applications.</p>
      <hr />
      {applications.length === 0 ? (
        <Alert variant="info">
          You have not submitted any candidate applications yet.
        </Alert>
      ) : (
        <div className="row g-4">
          {applications.map((app) => (
            <div className="col-12 col-md-6 col-lg-4" key={app._id}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>{app.election?.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <Badge bg={getStatusVariant(app.status)}>
                      {app.status}
                    </Badge>
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Position:</strong> {app.position}
                    <br />
                    <strong>Submitted on:</strong> {format(new Date(app.applicationDate), 'PPP')}
                    <br />
                    <details>
                      <summary>View Manifesto</summary>
                      <p className="mt-2 text-muted fst-italic">{app.manifesto}</p>
                    </details>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateApplicationStatus;