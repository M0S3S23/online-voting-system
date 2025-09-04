import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Badge,
  Nav,
  Alert,
  Spinner,
} from "react-bootstrap";
import {
  Search,
  ShieldCheck,
  PersonCircle,
  Calendar,
  People,
  BarChart,
  ExclamationTriangle,
  PersonCheck,
  ClipboardCheck,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import AppHeader from "../components/AppHeader";
import CandidateApplicationForm from "../components/form/CandidateApplicationForm";

const ElectionsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedElection, setSelectedElection] = useState(null);
  const [applicationStatuses, setApplicationStatuses] = useState({});

  // Fetch elections from backend
  useEffect(() => {
    fetchElections();
    fetchApplicationStatuses();
  }, []);

  const fetchElections = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:3000/api/elections");
      if (!response.ok) {
        throw new Error("Failed to fetch elections");
      }

      const data = await response.json();
      setElections(data);
    } catch (err) {
      console.error("Error fetching elections:", err);
      setError("Failed to load elections. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch application statuses for all elections
  const fetchApplicationStatuses = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch("http://localhost:3000/api/elections");
      if (!response.ok) return;
      
      const electionsData = await response.json();
      const statuses = {};
      
      // Check application status for each election
      await Promise.all(
        electionsData.map(async (election) => {
          try {
            const statusResponse = await fetch(
              `http://localhost:3000/api/elections/${election._id}/application-status`,
              {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              }
            );
            if (statusResponse.ok) {
              const statusData = await statusResponse.json();
              statuses[election._id] = statusData;
            }
          } catch (err) {
            // Ignore errors for individual status checks
            console.log(`No application found for election ${election._id}`);
          }
        })
      );
      
      setApplicationStatuses(statuses);
    } catch (err) {
      console.error("Error fetching application statuses:", err);
    }
  };

  // Handle opening application form
  const handleApplyClick = (election) => {
    setSelectedElection(election);
    setShowApplicationForm(true);
  };

  // Handle application submission
  const handleApplicationSubmit = () => {
    // Refresh application statuses after submission
    fetchApplicationStatuses();
  };

  // Get button text and action based on application status
  const getApplicationButton = (election) => {
    // Only show application buttons for upcoming elections
    if (election.status !== 'upcoming') {
      return null;
    }

    const status = applicationStatuses[election._id];
    
    if (status && status.status !== 'not_found') {
      // User has already applied
      return (
        <Link to={`/candidate/application-status`}>
          <Button variant="outline-success" size="sm">
            <ClipboardCheck className="me-1" size={16} />
            View Application Status
          </Button>
        </Link>
      );
    }
    
    // User hasn't applied yet - show apply button
    return (
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => handleApplyClick(election)}
      >
        <PersonCheck className="me-1" size={16} />
        Apply to Stand
      </Button>
    );
  };

  // Filter elections based on active filter and search query
  const filteredElections = elections.filter((election) => {
    const matchesFilter =
      activeFilter === "all" || election.status === activeFilter;
    const matchesSearch =
      election.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      election.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "ongoing":
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
      case "ongoing":
        return "Ongoing";
      case "upcoming":
        return "Upcoming";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  // Calculate total candidates for an election
  const getTotalCandidates = (election) => {
    return election.candidates ? election.candidates.length : 0;
  };

  // Calculate total votes for an election
  const getTotalVotes = (election) => {
    return election.votes ? election.votes.length : 0;
  };

  if (loading) {
    return (
      <div className="elections-page">
        <AppHeader active="Elections" />

        <Container className="py-5">
          <div className="text-center">
            <Spinner animation="border" role="status" className="mb-3">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h4>Loading elections...</h4>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="elections-page">
        <AppHeader active="Elections" />

        <Container className="py-5">
          <Alert variant="danger" className="d-flex align-items-center">
            <ExclamationTriangle size={32} className="me-3 flex-shrink-0" />
            <div>
              <h5 className="mb-1">Error Loading Elections</h5>
              <p className="mb-3">{error}</p>
              <Button variant="outline-danger" onClick={fetchElections}>
                Try Again
              </Button>
            </div>
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className="elections-page">
      <AppHeader active="Elections" />

      {/* Main Content */}
      <Container className="py-4">
        {/* Page Heading */}
        <Row className="mb-4">
          <Col>
            <h1>Elections</h1>
            <p className="lead text-muted">
              Participate in democratic processes and make your voice heard
            </p>
          </Col>
        </Row>

        {/* Search and Filter Bar */}
        <Row className="mb-4">
          <Col md={8}>
            <InputGroup>
              <InputGroup.Text>
                <Search />
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Search elections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={4} className="d-flex justify-content-end">
            <div className="btn-group">
              <Button
                variant={
                  activeFilter === "all" ? "primary" : "outline-secondary"
                }
                onClick={() => setActiveFilter("all")}
              >
                All
              </Button>
              <Button
                variant={
                  activeFilter === "ongoing" ? "primary" : "outline-secondary"
                }
                onClick={() => setActiveFilter("ongoing")}
              >
                Ongoing
              </Button>
              <Button
                variant={
                  activeFilter === "upcoming" ? "primary" : "outline-secondary"
                }
                onClick={() => setActiveFilter("upcoming")}
              >
                Upcoming
              </Button>
              <Button
                variant={
                  activeFilter === "completed" ? "primary" : "outline-secondary"
                }
                onClick={() => setActiveFilter("completed")}
              >
                Completed
              </Button>
            </div>
          </Col>
        </Row>

        {/* Election Listings */}
        <Row className="g-4">
          {filteredElections.length > 0 ? (
            filteredElections.map((election) => (
              <Col key={election._id} lg={6}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h4 className="mb-0">{election.title}</h4>
                      <Badge bg={getStatusBadgeColor(election.status)}>
                        {getStatusDisplayText(election.status)}
                      </Badge>
                    </div>
                    <p className="text-muted mb-4">{election.description}</p>

                    {/* Election Stats */}
                    <Row className="mb-4 g-3">
                      <Col xs={4}>
                        <div className="d-flex align-items-center">
                          <People size={18} className="me-2 text-muted" />
                          <div>
                            <small className="text-muted d-block">
                              Total Votes
                            </small>
                            <span className="fw-bold">
                              {getTotalVotes(election).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div className="d-flex align-items-center">
                          <PersonCircle size={18} className="me-2 text-muted" />
                          <div>
                            <small className="text-muted d-block">
                              Candidates
                            </small>
                            <span className="fw-bold">
                              {getTotalCandidates(election)}
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div className="d-flex align-items-center">
                          <BarChart size={18} className="me-2 text-muted" />
                          <div>
                            <small className="text-muted d-block">
                              Positions
                            </small>
                            <span className="fw-bold">
                              {election.positions
                                ? election.positions.length
                                : 0}
                            </span>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    {/* Positions List */}
                    {election.positions && election.positions.length > 0 && (
                      <div className="mb-4">
                        <h6 className="mb-2">Positions:</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {election.positions.map((position, index) => (
                            <Badge
                              key={index}
                              bg="light"
                              text="dark"
                              className="d-flex align-items-center"
                            >
                              <PersonCircle size={16} className="me-1" />
                              {position.positionName} ({position.seats} seat
                              {position.seats > 1 ? "s" : ""})
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Dates and Action Buttons */}
                    <div className="d-flex justify-content-between align-items-end">
                      <div>
                        <small className="text-muted d-block">
                          Starts: {formatDate(election.startDate)}
                        </small>
                        <small className="text-muted d-block">
                          Ends: {formatDate(election.endDate)}
                        </small>
                      </div>
                      <div className="d-flex gap-2">
                        {getApplicationButton(election)}
                        {election.status === "ongoing" ? (
                          <Link to={`/elections/${election._id}`}>
                            <Button variant="primary">View & Vote</Button>
                          </Link>
                        ) : (
                          <Link to={`/elections/${election._id}`}>
                            <Button variant="outline-primary">
                              View Details
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Card className="text-center py-5">
                <h5 className="text-muted">
                  No elections found matching your criteria
                </h5>
                {searchQuery && (
                  <p className="text-muted">
                    Try adjusting your search or filters
                  </p>
                )}
              </Card>
            </Col>
          )}
        </Row>

        {/* Secure Voting Guarantee Banner */}
        <Row className="mt-5">
          <Col>
            <Alert variant="info" className="d-flex align-items-center">
              <ShieldCheck size={32} className="me-3 flex-shrink-0" />
              <div>
                <h5 className="mb-1">Secure Voting Guarantee</h5>
                <p className="mb-0">
                  All votes are encrypted end-to-end and verified through
                  multiple security layers. Your privacy is protected while
                  maintaining complete transparency in the democratic process.
                </p>
              </div>
            </Alert>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
      
      {/* Candidate Application Form Modal */}
      <CandidateApplicationForm
        show={showApplicationForm && selectedElection !== null}
        onHide={() => {
          setShowApplicationForm(false);
          setSelectedElection(null);
        }}
        election={selectedElection}
        onApplicationSubmit={handleApplicationSubmit}
      />
    </div>
  );
};

export default ElectionsPage;
