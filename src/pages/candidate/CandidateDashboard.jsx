import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Spinner, Alert } from "react-bootstrap";
import { useUser } from "../../contexts/UserContext";

const CandidateDashboard = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/candidates/dashboard", {
          credentials: "include",
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch dashboard data");
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="my-5 text-center">
        <Spinner animation="border" role="status" className="mb-3" />
        <div>Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-5 text-center">
        <Alert variant="danger">{error}</Alert>
        <Link to="/elections" className="btn btn-primary mt-3">Browse Elections</Link>
      </div>
    );
  }

  const { candidate, election, competition, message } = dashboardData;
  const isApproved = candidate?.applicationStatus === "Approved";

  return (
    <div className="candidate-dashboard-page">
      <h2 className="mb-4">Candidate Dashboard</h2>
      <p className="lead">
        Welcome, {user.firstName}! Here's a summary of your campaign.
      </p>

      {message && (
        <Alert variant={isApproved ? "success" : "warning"} className="mb-4">
          {message}
        </Alert>
      )}

      <div className="row g-4 mt-4">
        <div className="col-md-6 col-lg-4">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>My Campaign Status</Card.Title>
              <Card.Text>
                <strong>Election:</strong> {election?.title || 'N/A'}
                <br />
                <strong>Status:</strong> {candidate?.applicationStatus}
                <br />
                <strong>Current Votes:</strong> {isApproved ? candidate?.totalVotes : 'N/A'}
                <br />
                <strong>Rank:</strong> {isApproved ? candidate?.rank : 'N/A'}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6 col-lg-8">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Competition</Card.Title>
              {!isApproved ? (
                <Alert variant="info" className="my-3">
                  Competition data is only available for approved candidates.
                </Alert>
              ) : (
                <Card.Text>
                  <p>Competition data would be displayed here, perhaps in a chart.</p>
                  <pre>{JSON.stringify(competition, null, 2)}</pre>
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;