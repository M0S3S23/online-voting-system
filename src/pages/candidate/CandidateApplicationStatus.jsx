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
  Table 
} from "react-bootstrap";
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  InfoCircle,
  PersonCheck,
  FileText,
  Award,
  Calendar
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import Footer from "../../components/Footer";

const CandidateApplicationStatus = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }

      // New single endpoint to get all applications for the current user
      const response = await fetch("http://localhost:3000/api/applications/my", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch applications.");
      }

      const userApplications = await response.json();
      setApplications(userApplications);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("Failed to load application status. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'accepted':
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
      case 'accepted':
        return <Badge bg="success">Approved</Badge>;
      case 'pending':
        return <Badge bg="warning">Pending Review</Badge>;
      case 'rejected':
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div>
        <AppHeader />
        <Container className="py-5">
          <div className="text-center">
            <Spinner animation="border" role="status" className="mb-3">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h4>Loading your applications...</h4>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <AppHeader />
        <Container className="py-5">
          <Alert variant="danger">
            <h5>Error Loading Applications</h5>
            <p>{error}</p>
            <Button variant="outline-danger" onClick={fetchApplications}>
              Try Again
            </Button>
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <AppHeader />
      
      <Container className="py-4">
        {/* Page Header */}
        <Row className="mb-4">
          <Col>
            <h1>My Candidate Applications</h1>
            <p className="lead text-muted">
              Track the status of your election candidate applications
            </p>
          </Col>
        </Row>

        {applications.length === 0 ? (
          <Card className="text-center py-5">
            <Card.Body>
              <PersonCheck size={48} className="text-muted mb-3" />
              <h5 className="text-muted">No Applications Found</h5>
              <p className="text-muted">
                You haven't applied for any candidate positions yet.
              </p>
              <Button 
                variant="primary" 
                onClick={() => navigate('/elections')}
              >
                Browse Elections
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Row className="g-4">
            {applications.map((app, index) => (
              <Col key={index} lg={12}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <div className="d-flex align-items-start mb-3">
                          <div className="me-3 mt-1">
                            {getStatusIcon(app.status)}
                          </div>
                          <div className="flex-grow-1">
                            {/* The name and party are now from the application object itself */}
                            <h5 className="mb-1">{app.election.title}</h5>
                            <div className="d-flex align-items-center gap-3 mb-2">
                              <small className="text-muted">
                                <Award className="me-1" size={14} />
                                Position: <strong>{app.position}</strong>
                              </small>
                              <small className="text-muted">
                                <FileText className="me-1" size={14} />
                                Party: <strong>{app.party}</strong>
                              </small>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={4} className="text-md-end">
                        <div className="mb-2">
                          {getStatusBadge(app.status)}
                        </div>
                        <small className="text-muted d-block">
                          <Calendar className="me-1" size={14} />
                          Applied: {formatDate(app.applicationDate)}
                        </small>
                      </Col>
                    </Row>

                    {/* Application Details */}
                    <hr />
                    <Row>
                      <Col md={6}>
                        <h6>Application Details</h6>
                        <Table size="sm" className="mb-0">
                          <tbody>
                            <tr>
                              <td><strong>Applicant:</strong></td>
                              <td>{app.candidate.firstName} {app.candidate.lastName}</td>
                            </tr>
                            <tr>
                              <td><strong>Email:</strong></td>
                              <td>{app.candidate.email}</td>
                            </tr>
                            <tr>
                              <td><strong>Position:</strong></td>
                              <td>{app.position}</td>
                            </tr>
                            <tr>
                              <td><strong>Party:</strong></td>
                              <td>{app.party}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                      <Col md={6}>
                        <h6>Election Information</h6>
                        <Table size="sm" className="mb-0">
                          <tbody>
                            <tr>
                              <td><strong>Election:</strong></td>
                              <td>{app.election.title}</td>
                            </tr>
                            <tr>
                              <td><strong>Status:</strong></td>
                              <td>
                                <Badge bg={
                                  app.election.status === 'ongoing' ? 'success' :
                                  app.election.status === 'upcoming' ? 'primary' : 'secondary'
                                }>
                                  {app.election.status.charAt(0).toUpperCase() + app.election.status.slice(1)}
                                </Badge>
                              </td>
                            </tr>
                            <tr>
                              <td><strong>Start Date:</strong></td>
                              <td>{formatDate(app.election.startDate)}</td>
                            </tr>
                            <tr>
                              <td><strong>End Date:</strong></td>
                              <td>{formatDate(app.election.endDate)}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Row>

                    {/* Manifesto Preview */}
                    {app.manifesto && (
                      <>
                        <hr />
                        <div>
                          <h6>Manifesto</h6>
                          <p className="text-muted small">
                            {app.manifesto.length > 200 
                              ? `${app.manifesto.substring(0, 200)}...`
                              : app.manifesto
                            }
                          </p>
                        </div>
                      </>
                    )}

                    {/* Status-specific messages */}
                    {app.status.toLowerCase() === 'pending' && (
                      <Alert variant="info" className="mt-3 mb-0">
                        <InfoCircle className="me-2" />
                        Your application is under review. You will be notified once a decision is made.
                      </Alert>
                    )}
                    
                    {app.status.toLowerCase() === 'approved' && (
                      <Alert variant="success" className="mt-3 mb-0">
                        <CheckCircle className="me-2" />
                        Congratulations! Your application has been approved. You are now a candidate for this election.
                      </Alert>
                    )}
                    
                    {app.status.toLowerCase() === 'rejected' && (
                      <Alert variant="danger" className="mt-3 mb-0">
                        <XCircle className="me-2" />
                        Unfortunately, your application was not approved. Please contact the election administrator for more information.
                      </Alert>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default CandidateApplicationStatus;