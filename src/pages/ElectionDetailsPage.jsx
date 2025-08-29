import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Alert,
  Spinner,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import {
  ArrowLeft,
  Calendar,
  People,
  PersonCircle,
  ShieldCheck,
  ExclamationTriangle,
  CheckCircle,
  Clock,
  BarChart,
} from "react-bootstrap-icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const ElectionDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchElectionDetails();
  }, [id]);

  const fetchElectionDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:3000/api/elections/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch election details");
      }

      const data = await response.json();
      setElection(data);
    } catch (err) {
      console.error("Error fetching election details:", err);
      setError("Failed to load election details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "upcoming":
        return "primary";
      case "completed":
        return "secondary";
      default:
        return "secondary";
    }
  };

  // Get status display text
  const getStatusDisplayText = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "upcoming":
        return "Upcoming";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  // Calculate total candidates for an election
  const getTotalCandidates = () => {
    return election?.candidates ? election.candidates.length : 0;
  };

  // Calculate total votes for an election
  const getTotalVotes = () => {
    return election?.votes ? election.votes.length : 0;
  };

  // Get candidates count for a specific position
  const getCandidatesForPosition = (positionName) => {
    if (!election?.candidates) return 0;
    return election.candidates.filter(
      (c) => c.position === positionName && c.approved
    ).length;
  };

  // Calculate vote tallies grouped by position for accurate per-position analytics
  const getVoteTalliesByPosition = () => {
    if (!election) return {};

    const resultsByPosition = {};
    const positions = election.positions || [];

    // Helper to count votes for a given position
    const buildCountsForPosition = (positionName) => {
      const counts = new Map();
      for (const v of election.votes || []) {
        if (v.position === positionName) {
          const key = String(v.candidateId);
          counts.set(key, (counts.get(key) || 0) + 1);
        }
      }
      return counts;
    };

    for (const pos of positions) {
      const positionName = pos.positionName;
      const countsMap = buildCountsForPosition(positionName);

      const candidatesForPosition = (election.candidates || []).filter(
        (c) => c.position === positionName
      );

      const tallies = candidatesForPosition
        .map((c) => {
          const count = countsMap.get(String(c._id)) || 0;
          const userObj = c.userId || c.user || {};
          const first = userObj.firstName || "";
          const last = userObj.lastName || "";
          const displayName = `${first} ${last}`.trim() || "Unknown";
          return {
            candidateId: String(c._id),
            name: displayName,
            party: c.party,
            count,
          };
        })
        .sort((a, b) => b.count - a.count);

      const total = tallies.reduce((sum, t) => sum + t.count, 0);
      const leader = tallies.length > 0 ? tallies[0] : null;

      resultsByPosition[positionName] = {
        total,
        tallies,
        leader,
        position: pos,
      };
    }

    return resultsByPosition;
  };

  if (loading) {
    return (
      <div className="election-details-page">
        <nav className="navbar navbar-dark bg-dark">
          <Container>
            <span className="navbar-brand fw-bold">VoteSecure</span>
          </Container>
        </nav>

        <Container className="py-5">
          <div className="text-center">
            <Spinner animation="border" role="status" className="mb-3">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h4>Loading election details...</h4>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="election-details-page">
        <nav className="navbar navbar-dark bg-dark">
          <Container>
            <span className="navbar-brand fw-bold">VoteSecure</span>
          </Container>

          <Container className="py-5">
            <Alert variant="danger" className="d-flex align-items-center">
              <ExclamationTriangle size={32} className="me-3 flex-shrink-0" />
              <div>
                <h5 className="mb-1">Error Loading Election</h5>
                <p className="mb-3">{error}</p>
                <Button variant="outline-danger" onClick={fetchElectionDetails}>
                  Try Again
                </Button>
              </div>
            </Alert>
          </Container>
        </nav>
      </div>
    );
  }

  if (!election) {
    return (
      <div className="election-details-page">
        <nav className="navbar navbar-dark bg-dark">
          <Container>
            <span className="navbar-brand fw-bold">VoteSecure</span>
          </Container>

          <Container className="py-5">
            <Alert variant="warning">
              <h5>Election Not Found</h5>
              <p>The election you're looking for doesn't exist.</p>
              <Link to="/elections">
                <Button variant="primary">Back to Elections</Button>
              </Link>
            </Alert>
          </Container>
        </nav>
      </div>
    );
  }

  return (
    <div className="election-details-page">
      {/* Navigation Bar */}
      <nav className="navbar navbar-dark bg-dark">
        <Container>
          <span className="navbar-brand fw-bold">VoteSecure</span>
          <div className="d-flex align-items-center">
            <Link to="/elections" className="btn btn-outline-light me-3">
              <ArrowLeft className="me-1" /> Back to Elections
            </Link>
            <div className="dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
              >
                John Smith
              </button>
            </div>
          </div>
        </Container>
      </nav>

      {/* Main Content */}
      <Container className="py-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/elections">Elections</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {election.title}
            </li>
          </ol>
        </nav>

        {/* Election Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h1 className="mb-2">{election.title}</h1>
                <p className="lead text-muted mb-3">{election.description}</p>
                <div className="d-flex align-items-center gap-3">
                  <Badge bg={getStatusBadgeColor(election.status)} size="lg">
                    {getStatusDisplayText(election.status)}
                  </Badge>
                  {election.status === "ongoing" && (
                    <Badge bg="success" size="lg">
                      <CheckCircle className="me-1" />
                      Voting Open
                    </Badge>
                  )}
                  {election.status === "upcoming" && (
                    <Badge bg="info" size="lg">
                      <Clock className="me-1" />
                      Coming Soon
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Election Stats */}
        <Row className="mb-4 g-3">
          <Col md={3}>
            <Card className="text-center h-100">
              <Card.Body>
                <Calendar size={32} className="text-primary mb-2" />
                <h5>Start Date</h5>
                <p className="mb-0">{formatDate(election.startDate)}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center h-100">
              <Card.Body>
                <Clock size={32} className="text-warning mb-2" />
                <h5>End Date</h5>
                <p className="mb-0">{formatDate(election.endDate)}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center h-100">
              <Card.Body>
                <People size={32} className="text-success mb-2" />
                <h5>Total Votes</h5>
                <p className="mb-0">{getTotalVotes().toLocaleString()}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center h-100">
              <Card.Body>
                <PersonCircle size={32} className="text-info mb-2" />
                <h5>Candidates</h5>
                <p className="mb-0">{getTotalCandidates()}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Positions Section */}
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <h4 className="mb-0">
                  <BarChart className="me-2" />
                  Available Positions
                </h4>
              </Card.Header>
              <Card.Body>
                {election.positions && election.positions.length > 0 ? (
                  <ListGroup variant="flush">
                    {election.positions.map((position, index) => (
                      <ListGroupItem
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <h6 className="mb-1">{position.positionName}</h6>
                          <p className="text-muted mb-0">
                            {position.description}
                          </p>
                          <small className="text-muted">
                            {position.seats} seat{position.seats > 1 ? "s" : ""}{" "}
                            available
                          </small>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                          <Badge bg="light" text="dark">
                            {getCandidatesForPosition(position.positionName)}{" "}
                            candidates
                          </Badge>
                          {election.status === "active" ? (
                            <Link
                              to={`/elections/${election._id}/positions/${position.positionName}`}
                            >
                              <Button variant="primary" size="sm">
                                Vote Now
                              </Button>
                            </Link>
                          ) : (
                            <Link
                              to={`/elections/${election._id}/positions/${position.positionName}`}
                            >
                              <Button variant="outline-primary" size="sm">
                                View Candidates
                              </Button>
                            </Link>
                          )}
                        </div>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                ) : (
                  <Alert variant="info">
                    <p className="mb-0">
                      No positions have been defined for this election yet.
                    </p>
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Live Vote Analytics (Per Position) */}
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Live Vote Analytics</h4>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={fetchElectionDetails}
                >
                  Refresh
                </Button>
              </Card.Header>
              <Card.Body>
                {(() => {
                  const analytics = getVoteTalliesByPosition();
                  const positionNames = Object.keys(analytics);
                  if (positionNames.length === 0) {
                    return (
                      <Alert variant="info" className="mb-0">
                        No positions to analyze.
                      </Alert>
                    );
                  }

                  return positionNames.map((pName) => {
                    const { total, tallies, leader, position } =
                      analytics[pName];
                    return (
                      <Card key={pName} className="mb-4">
                        <Card.Header>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <strong>{position.positionName}</strong>
                              <span className="text-muted ms-2">
                                {position.seats} seat
                                {position.seats > 1 ? "s" : ""}
                              </span>
                            </div>
                            <div>
                              <strong>Total Votes:</strong>{" "}
                              {total.toLocaleString()}
                            </div>
                          </div>
                          {position.description && (
                            <div className="text-muted small mt-1">
                              {position.description}
                            </div>
                          )}
                        </Card.Header>
                        <Card.Body>
                          {tallies.length > 0 ? (
                            <>
                              {tallies.map((t) => {
                                const pct =
                                  total > 0
                                    ? Math.round((t.count / total) * 100)
                                    : 0;
                                return (
                                  <div key={t.candidateId} className="mb-3">
                                    <div className="d-flex justify-content-between">
                                      <div>
                                        <strong>{t.name}</strong>{" "}
                                        <span className="text-muted">
                                          ({t.party})
                                        </span>
                                      </div>
                                      <div>
                                        {t.count.toLocaleString()} votes ({pct}
                                        %)
                                      </div>
                                    </div>
                                    <div
                                      className="progress"
                                      style={{ height: 10 }}
                                    >
                                      <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{ width: `${pct}%` }}
                                        aria-valuenow={pct}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                              {leader && (
                                <Alert variant="success" className="mt-3">
                                  <CheckCircle className="me-2" />
                                  Current leader: <strong>
                                    {leader.name}
                                  </strong>{" "}
                                  ({leader.party}) with{" "}
                                  {leader.count.toLocaleString()} votes
                                </Alert>
                              )}
                            </>
                          ) : (
                            <Alert variant="info" className="mb-0">
                              No votes for this position yet.
                            </Alert>
                          )}
                        </Card.Body>
                      </Card>
                    );
                  });
                })()}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Security Notice */}
        <Row className="mb-4">
          <Col>
            <Alert variant="info" className="d-flex align-items-center">
              <ShieldCheck size={32} className="me-3 flex-shrink-0" />
              <div>
                <h5 className="mb-1">Secure Voting Process</h5>
                <p className="mb-0">
                  Your vote is encrypted and secure. Each position allows one
                  vote per voter, and all voting activity is logged for
                  transparency while maintaining your privacy.
                </p>
              </div>
            </Alert>
          </Col>
        </Row>

        {/* Action Buttons */}
        <Row className="mb-4">
          <Col className="text-center">
            <Link to="/elections" className="btn btn-outline-secondary me-2">
              <ArrowLeft className="me-1" /> Back to Elections
            </Link>
            {election.status === "active" && (
              <Button variant="success" size="lg">
                <CheckCircle className="me-2" />
                Start Voting
              </Button>
            )}
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ElectionDetailsPage;
