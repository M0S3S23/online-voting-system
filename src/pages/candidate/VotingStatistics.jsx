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
} from "react-bootstrap";
import { 
  ClipboardCheck, 
  Person, 
  BarChartLine, 
  Clock,
  XCircle,
  CheckCircle,
  InfoCircle
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VotingStatistics = () => {
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

      const response = await fetch("http://localhost:3000/api/candidates/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          setData({ candidate: null }); 
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
    <div className="d-flex" style={{ minHeight: "100vh", background: "#f4f6fa" }}>
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <AppHeader />
        <Container fluid className="mt-4">
          <h1 className="mb-4">Voting Statistics</h1>
          
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
              {/* Key Metrics Cards */}
              <Row className="g-4 mb-4">
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Total Votes</Card.Title>
                      <h3 className="text-primary">{data.candidate.totalVotes}</h3>
                      <ClipboardCheck size={36} className="text-primary" />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Your Rank</Card.Title>
                      <h3 className="text-success">{data.candidate.rank}</h3>
                      <Person size={36} className="text-success" />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Application Status</Card.Title>
                      <h4>{getStatusBadge(data.candidate.applicationStatus)}</h4>
                      {data.candidate.applicationStatus.toLowerCase() === 'approved' ? <CheckCircle size={36} className="text-success" /> :
                       data.candidate.applicationStatus.toLowerCase() === 'pending' ? <Clock size={36} className="text-warning" /> :
                       <XCircle size={36} className="text-danger" />}
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
            </>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default VotingStatistics;