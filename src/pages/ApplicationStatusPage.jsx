import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Alert,
  Spinner,
  Button,
} from "react-bootstrap";
import {
  CheckCircle,
  Clock,
  XCircle,
  PersonCheck,
  Calendar,
  Award,
  FileText,
  Image,
  ArrowLeft,
} from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import Footer from "../components/Footer";

const ApplicationStatusPage = () => {
  const { electionId } = useParams();
  const [applicationData, setApplicationData] = useState(null);
  const [electionData, setElectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (electionId) {
      fetchApplicationStatus();
      fetchElectionDetails();
    }
  }, [electionId]);

  const fetchApplicationStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/elections/${electionId}/application-status`,
        {
          credentials: 'include'
        }
      );

      if (response.ok) {
        const data = await response.json();
        setApplicationData(data);
      } else if (response.status === 401) {
        setError("Please log in to view your application status");
      } else {
        setError("No application found for this election");
      }
    } catch (err) {
      console.error("Error fetching application status:", err);
      setError("Failed to load application status");
    }
  };

  const fetchElectionDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/elections/${electionId}`,
        {
          credentials: 'include'
        }
      );

      if (response.ok) {
        const data = await response.json();
        setElectionData(data);
      }
    } catch (err) {
      console.error("Error fetching election details:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return <CheckCircle size={24} className="text-success" />;
      case "pending":
        return <Clock size={24} className="text-warning" />;
      case "rejected":
        return <XCircle size={24} className="text-danger" />;
      default:
        return <Clock size={24} className="text-muted" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return <Badge bg="success">Approved</Badge>;
      case "pending":
        return <Badge bg="warning">Pending Review</Badge>;
      case "rejected":
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case "accepted":
        return {
          variant: "success",
          message: "Congratulations! Your application has been approved. You are now an official candidate for this election."
        };
      case "pending":
        return {
          variant: "info",
          message: "Your application is currently under review. We'll notify you once a decision has been made."
        };
      case "rejected":
        return {
          variant: "danger",
          message: "Unfortunately, your application was not approved. Please contact the election administrator for more details."
        };
      default:
        return {
          variant: "secondary",
          message: "Application status is currently unknown."
        };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <div className="application-status-page">
        <AppHeader />
        <Container className="py-5">
          <div className="text-center">
            <Spinner animation="border" role="status" className="mb-3">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h4>Loading application status...</h4>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="application-status-page">
        <AppHeader />
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={8}>
              <Alert variant="danger" className="text-center">
                <XCircle size={48} className="mb-3" />
                <h4>Error Loading Application</h4>
                <p>{error}</p>
                <Link to="/elections">
                  <Button variant="outline-danger">
                    <ArrowLeft className="me-2" />
                    Back to Elections
                  </Button>
                </Link>
              </Alert>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  if (!applicationData) {
    return (
      <div className="application-status-page">
        <AppHeader />
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={8}>
              <Alert variant="info" className="text-center">
                <PersonCheck size={48} className="mb-3" />
                <h4>No Application Found</h4>
                <p>You haven't submitted an application for this election yet.</p>
                <Link to="/elections">
                  <Button variant="primary">
                    <ArrowLeft className="me-2" />
                    Back to Elections
                  </Button>
                </Link>
              </Alert>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  const statusInfo = getStatusMessage(applicationData.status);

  return (
    <div className="application-status-page">
      <AppHeader />

      <Container className="py-4">
        {/* Back Button */}
        <Row className="mb-3">
          <Col>
            <Link to="/elections">
              <Button variant="outline-secondary" size="sm">
                <ArrowLeft className="me-2" />
                Back to Elections
              </Button>
            </Link>
          </Col>
        </Row>

        {/* Page Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex align-items-center mb-2">
              {getStatusIcon(applicationData.status)}
              <h1 className="ms-3 mb-0">Application Status</h1>
            </div>
            <p className="lead text-muted">
              {electionData ? electionData.title : "Election Application"}
            </p>
          </Col>
        </Row>

        {/* Status Alert */}
        <Row className="mb-4">
          <Col>
            <Alert variant={statusInfo.variant} className="d-flex align-items-center">
              {getStatusIcon(applicationData.status)}
              <div className="ms-3">
                <h5 className="mb-1">
                  Application Status: {getStatusBadge(applicationData.status)}
                </h5>
                <p className="mb-0">{statusInfo.message}</p>
              </div>
            </Alert>
          </Col>
        </Row>

        {/* Application Details */}
        <Row>
          <Col lg={8}>
            <Card className="shadow-sm">
              <Card.Header>
                <h5 className="mb-0">
                  <FileText className="me-2" />
                  Application Details
                </h5>
              </Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Col sm={4}>
                    <strong>Full Name:</strong>
                  </Col>
                  <Col sm={8}>
                    {applicationData.details?.fullName || "N/A"}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col sm={4}>
                    <strong>Email:</strong>
                  </Col>
                  <Col sm={8}>
                    {applicationData.details?.email || "N/A"}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col sm={4}>
                    <strong>Position:</strong>
                  </Col>
                  <Col sm={8}>
                    <Badge bg="primary" className="fs-6">
                      {applicationData.details?.position || "N/A"}
                    </Badge>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col sm={4}>
                    <strong>Party/Affiliation:</strong>
                  </Col>
                  <Col sm={8}>
                    <Badge bg="secondary" className="fs-6">
                      <Award className="me-1" size={14} />
                      {applicationData.details?.party || "N/A"}
                    </Badge>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col sm={4}>
                    <strong>Application Date:</strong>
                  </Col>
                  <Col sm={8}>
                    <Calendar className="me-2" size={16} />
                    {formatDate(applicationData.details?.applicationDate)}
                  </Col>
                </Row>

                {applicationData.details?.manifesto && (
                  <Row className="mb-3">
                    <Col sm={4}>
                      <strong>Manifesto:</strong>
                    </Col>
                    <Col sm={8}>
                      <div className="bg-light p-3 rounded">
                        <p className="mb-0" style={{ whiteSpace: "pre-wrap" }}>
                          {applicationData.details.manifesto}
                        </p>
                      </div>
                    </Col>
                  </Row>
                )}

                {applicationData.details?.poster && (
                  <Row className="mb-3">
                    <Col sm={4}>
                      <strong>Campaign Poster:</strong>
                    </Col>
                    <Col sm={8}>
                      <div className="d-flex align-items-center">
                        <Image className="me-2" size={16} />
                        <span className="text-success">Poster uploaded</span>
                      </div>
                    </Col>
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Election Info Sidebar */}
          <Col lg={4}>
            {electionData && (
              <Card className="shadow-sm">
                <Card.Header>
                  <h6 className="mb-0">Election Information</h6>
                </Card.Header>
                <Card.Body>
                  <h6>{electionData.title}</h6>
                  <p className="text-muted small mb-3">
                    {electionData.description}
                  </p>

                  <div className="mb-2">
                    <small className="text-muted">Status:</small>
                    <Badge 
                      bg={electionData.status === 'ongoing' ? 'success' : 
                          electionData.status === 'upcoming' ? 'primary' : 'secondary'}
                      className="ms-2"
                    >
                      {electionData.status}
                    </Badge>
                  </div>

                  <div className="mb-2">
                    <small className="text-muted">Start Date:</small>
                    <div>{formatDate(electionData.startDate)}</div>
                  </div>

                  <div className="mb-2">
                    <small className="text-muted">End Date:</small>
                    <div>{formatDate(electionData.endDate)}</div>
                  </div>

                  <div className="mt-3">
                    <Link to={`/elections/${electionId}`}>
                      <Button variant="outline-primary" size="sm" className="w-100">
                        View Election Details
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default ApplicationStatusPage;
