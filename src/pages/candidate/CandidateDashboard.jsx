import React, { useState, useEffect } from "react";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Alert, 
  Badge, 
  Spinner, 
  Button,
  Table,
  ProgressBar 
} from "react-bootstrap";
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  InfoCircle,
  Award,
  Calendar,
  Person
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CandidateDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      // Make a single API call to the new, consolidated dashboard endpoint
      const response = await fetch("http://localhost:3000/api/candidates/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          setData({ candidate: null }); // No application found
        } else {
          throw new Error(`Failed to fetch dashboard data with status: ${response.status}`);
        }
      } else {
        const result = await response.json();
        setData(result);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle className="text-success" size={20} />;
      case 'pending':
        return <Clock className="text-warning" size={20} />;
      case 'rejected':
        return <XCircle className="text-danger" size={20} />;
      default:
        return <InfoCircle className="text-info" size={20} />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <Badge bg="success">Approved</Badge>;
      case 'pending':
        return <Badge bg="warning">Pending Review</Badge>;
      case 'rejected':
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <h5>Error Loading Dashboard</h5>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={fetchDashboardData}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  const hasApplication = data && data.candidate;
  
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <AppHeader />
        <Container fluid className="mt-4">
          <h1 className="mb-4">Candidate Dashboard</h1>
          
          {!hasApplication ? (
            <Card className="text-center py-5">
              <Card.Body>
                <Person size={48} className="text-muted mb-3" />
                <h5 className="text-muted">No Applications Found</h5>
                <p className="text-muted">You haven't applied for any candidate positions yet.</p>
                <Button 
                  variant="primary" 
                  onClick={() => navigate('/elections')}
                >
                  Browse Elections
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <>
              {/* Main Dashboard Info */}
              <Row className="g-4 mb-4">
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Total Votes</Card.Title>
                      <h3>{data.candidate.totalVotes}</h3>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Your Rank</Card.Title>
                      <h3>{data.candidate.rank}</h3>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Application Status</Card.Title>
                      <h4 className="mt-2">{getStatusBadge(data.candidate.applicationStatus)}</h4>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Competition Chart */}
              <Row className="mb-4">
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title>Competition in Your Position</Card.Title>
                      <Bar 
                        data={data.competition} 
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'top',
                              display: false
                            },
                            title: {
                              display: true,
                              text: 'Votes by Candidate'
                            },
                          },
                          scales: {
                            y: {
                              beginAtZero: true,
                              title: {
                                display: true,
                                text: 'Votes'
                              }
                            }
                          }
                        }}
                      />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Profile Completion and Election Info */}
              <Row className="g-4 mb-4">
                <Col md={6}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Profile Completion</Card.Title>
                      <ProgressBar 
                        now={data.candidate.profileCompletion} 
                        label={`${data.candidate.profileCompletion}%`}
                        variant="success"
                      />
                      <p className="text-muted mt-2">
                        Complete your profile to boost your campaign.
                      </p>
                      <Button variant="outline-primary" size="sm" onClick={() => navigate('/profile')}>
                        Edit Profile
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Active Election</Card.Title>
                      <p><strong>Title:</strong> {data.election.title}</p>
                      <p><strong>Time Remaining:</strong> {data.election.timeRemaining}</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default CandidateDashboard;