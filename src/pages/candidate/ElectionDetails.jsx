import React, { useEffect, useState } from 'react';
import { Card, Spinner, Alert, ListGroup, Badge } from 'react-bootstrap';
import { useUser } from '../../contexts/UserContext';
import { format } from 'date-fns';

const ElectionDetails = () => {
  const { user } = useUser();
  const [electionDetails, setElectionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchElectionDetails = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const appResponse = await fetch('http://localhost:3000/api/candidates/applications/my', {
          credentials: 'include',
        });
        if (!appResponse.ok) {
          throw new Error('Failed to fetch applications.');
        }
        const applications = await appResponse.json();
        const approvedApp = applications.find(app => app.status === 'Approved');

        if (!approvedApp) {
          setError('You do not have an approved application for an active election.');
          setLoading(false);
          return;
        }

        const electionId = approvedApp.election._id;
        const electionResponse = await fetch(`http://localhost:3000/api/elections/${electionId}`, {
          credentials: 'include',
        });
        if (!electionResponse.ok) {
          throw new Error('Failed to fetch election details.');
        }
        const data = await electionResponse.json();
        setElectionDetails(data);
      } catch (err) {
        console.error('Error fetching election details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchElectionDetails();
  }, [user]);

  if (loading) {
    return <Spinner animation="border" className="m-auto d-block" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="candidate-election-details-page">
      <h2>Election Details</h2>
      <p className="lead">Information about the election you are running in.</p>
      <hr />
      {electionDetails ? (
        <Card className="shadow-sm">
          <Card.Header>
            <h4 className="mb-0">{electionDetails.title}</h4>
            <Badge bg="info" className="mt-2">{electionDetails.status}</Badge>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <strong>Description:</strong> {electionDetails.description}
            </Card.Text>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Start Date:</strong> {format(new Date(electionDetails.startDate), 'PPPP')}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>End Date:</strong> {format(new Date(electionDetails.endDate), 'PPPP')}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Positions:</strong>
                <ul>
                  {electionDetails.positions.map((pos, index) => (
                    <li key={index}>{pos.positionName} ({pos.seats} seat{pos.seats > 1 ? 's' : ''})</li>
                  ))}
                </ul>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="info">No election details found for your approved application.</Alert>
      )}
    </div>
  );
};

export default ElectionDetails;