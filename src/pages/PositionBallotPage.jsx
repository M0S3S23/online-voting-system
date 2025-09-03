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
  Modal,
  Form,
} from "react-bootstrap";
import {
  ArrowLeft,
  PersonCircle,
  ShieldCheck,
  ExclamationTriangle,
  CheckCircle,
  FileText,
  Building,
  Calendar,
  People,
} from "react-bootstrap-icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import AppHeader from "../components/AppHeader";

const PositionBallotPage = () => {
  const { id, positionId } = useParams();
  const navigate = useNavigate();
  const [election, setElection] = useState(null);
  const [position, setPosition] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [voting, setVoting] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(false);

  useEffect(() => {
    fetchPositionData();
  }, [id, positionId]);

  const fetchPositionData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch election details
      const electionResponse = await fetch(
        `http://localhost:3000/api/elections/${id}`
      );
      if (!electionResponse.ok) {
        throw new Error("Failed to fetch election details");
      }
      const electionData = await electionResponse.json();
      setElection(electionData);

      // Find the position
      const positionData = electionData.positions.find(
        (p) => p.positionName === positionId
      );
      if (!positionData) {
        throw new Error("Position not found");
      }
      setPosition(positionData);

      // Fetch candidates for this position
      const candidatesResponse = await fetch(
        `http://localhost:3000/api/elections/${id}/positions/${positionId}/candidates`
      );
      if (!candidatesResponse.ok) {
        throw new Error("Failed to fetch candidates");
      }
      const candidatesData = await candidatesResponse.json();
      setCandidates(candidatesData.candidates || []);
    } catch (err) {
      console.error("Error fetching position data:", err);
      setError(
        err.message || "Failed to load position data. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async () => {
    if (!selectedCandidate) return;

    try {
      setVoting(true);

      const response = await fetch(
        `http://localhost:3000/api/elections/${id}/positions/${positionId}/vote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            candidateId: selectedCandidate._id,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit vote");
      }

      setVoteSuccess(true);
      setShowVoteModal(false);

      // Redirect after successful vote
      setTimeout(() => {
        navigate(`/elections/${id}`);
      }, 2000);
    } catch (err) {
      console.error("Error submitting vote:", err);
      alert(err.message || "Failed to submit vote. Please try again.");
    } finally {
      setVoting(false);
    }
  };

  const confirmVote = () => {
    if (selectedCandidate) {
      setShowVoteModal(true);
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

  if (loading) {
    return (
      <div className="position-ballot-page">
        <AppHeader active="Elections" />

        <Container className="py-5">
          <div className="text-center">
            <Spinner animation="border" role="status" className="mb-3">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h4>Loading ballot...</h4>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="position-ballot-page">
        <AppHeader active="Elections" />

        <Container className="py-5">
          <Alert variant="danger" className="d-flex align-items-center">
            <ExclamationTriangle size={32} className="me-3 flex-shrink-0" />
            <div>
              <h5 className="mb-1">Error Loading Ballot</h5>
              <p className="mb-3">{error}</p>
              <Link to={`/elections/${id}`}>
                <Button variant="outline-danger">Back to Election</Button>
              </Link>
            </div>
          </Alert>
        </Container>
      </div>
    );
  }

  if (voteSuccess) {
    return (
      <div className="position-ballot-page">
        <AppHeader active="Elections" />

        <Container className="py-5">
          <Alert variant="success" className="text-center">
            <CheckCircle size={64} className="mb-3 text-success" />
            <h4>Vote Submitted Successfully!</h4>
            <p className="mb-3">
              Thank you for participating in the democratic process.
            </p>
            <p className="text-muted">
              Redirecting you back to the election...
            </p>
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className="position-ballot-page">
      <AppHeader active="Elections" />

      {/* Main Content */}
      <Container className="py-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/elections">Elections</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/elections/${id}`}>{election?.title}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {position?.positionName}
            </li>
          </ol>
        </nav>

        {/* Position Header */}
        <Row className="mb-4">
          <Col>
            <div className="text-center">
              <h1 className="mb-3">{position?.positionName}</h1>
              <p className="lead text-muted mb-3">{position?.description}</p>
              <div className="d-flex justify-content-center align-items-center gap-3">
                <Badge bg="info" size="lg">
                  <PersonCircle className="me-1" />
                  {position?.seats} seat{position?.seats > 1 ? "s" : ""}{" "}
                  available
                </Badge>
                <Badge bg="success" size="lg">
                  <People className="me-1" />
                  {candidates.length} candidate
                  {candidates.length !== 1 ? "s" : ""}
                </Badge>
              </div>
            </div>
          </Col>
        </Row>

        {/* Election Status */}
        {election && (
          <Row className="mb-4">
            <Col>
              <Alert
                variant={election.status === "active" ? "success" : "info"}
              >
                <div className="d-flex align-items-center">
                  {election.status === "active" ? (
                    <CheckCircle size={24} className="me-2" />
                  ) : (
                    <Calendar size={24} className="me-2" />
                  )}
                  <div>
                    <h6 className="mb-1">
                      {election.status === "active"
                        ? "Voting is Active"
                        : "Voting Not Yet Active"}
                    </h6>
                    <p className="mb-0">
                      {election.status === "active"
                        ? `Voting is open until ${formatDate(election.endDate)}`
                        : `Voting will begin on ${formatDate(
                            election.startDate
                          )}`}
                    </p>
                  </div>
                </div>
              </Alert>
            </Col>
          </Row>
        )}

        {/* Candidates */}
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <h4 className="mb-0">
                  <PersonCircle className="me-2" />
                  Candidates for {position?.positionName}
                </h4>
              </Card.Header>
              <Card.Body>
                {candidates.length > 0 ? (
                  <Row className="g-4">
                    {candidates.map((candidate, index) => (
                      <Col key={candidate._id} lg={6}>
                        <Card
                          className={`h-100 ${
                            selectedCandidate?._id === candidate._id
                              ? "border-primary"
                              : ""
                          }`}
                        >
                          <Card.Body>
                            <div className="d-flex align-items-start mb-3">
                              <div className="flex-shrink-0 me-3">
                                <PersonCircle
                                  size={48}
                                  className="text-primary"
                                />
                              </div>
                              <div className="flex-grow-1">
                                <h5 className="mb-1">
                                  {candidate.user?.firstName}{" "}
                                  {candidate.user?.lastName}
                                </h5>
                                <Badge bg="secondary" className="mb-2">
                                  <Building className="me-1" />
                                  {candidate.party}
                                </Badge>
                              </div>
                            </div>

                            <div className="mb-3">
                              <h6>
                                <FileText className="me-2" />
                                Manifesto
                              </h6>
                              <p className="text-muted">
                                {candidate.manifesto}
                              </p>
                            </div>

                            <div className="text-center">
                              <Form.Check
                                type="radio"
                                name="candidate"
                                id={`candidate-${candidate._id}`}
                                checked={
                                  selectedCandidate?._id === candidate._id
                                }
                                onChange={() => setSelectedCandidate(candidate)}
                                label="Select this candidate"
                              />
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Alert variant="info">
                    <p className="mb-0">
                      No candidates have been approved for this position yet.
                    </p>
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Voting Actions */}
        {candidates.length > 0 && election?.status === "ongoing" && (
          <Row className="mb-4">
            <Col className="text-center">
              <Button
                variant="success"
                size="lg"
                disabled={!selectedCandidate}
                onClick={confirmVote}
                className="me-3"
              >
                <CheckCircle className="me-2" />
                Submit Vote
              </Button>
              <Link to={`/elections/${id}`}>
                <Button variant="outline-secondary" size="lg">
                  <ArrowLeft className="me-2" />
                  Back to Election
                </Button>
              </Link>
            </Col>
          </Row>
        )}

        {/* Security Notice */}
        <Row className="mb-4">
          <Col>
            <Alert variant="info" className="d-flex align-items-center">
              <ShieldCheck size={32} className="me-3 flex-shrink-0" />
              <div>
                <h5 className="mb-1">Important Voting Information</h5>
                <p className="mb-0">
                  You can only vote once for this position. Once submitted, your
                  vote cannot be changed. All votes are encrypted and secure.
                  Make sure you have selected the candidate you want to vote
                  for.
                </p>
              </div>
            </Alert>
          </Col>
        </Row>
      </Container>

      {/* Vote Confirmation Modal */}
      <Modal
        show={showVoteModal}
        onHide={() => setShowVoteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Vote</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You are about to vote for:</p>
          <div className="text-center p-3 bg-light rounded">
            <h5>
              {selectedCandidate?.user?.firstName}{" "}
              {selectedCandidate?.user?.lastName}
            </h5>
            <Badge bg="secondary">{selectedCandidate?.party}</Badge>
          </div>
          <p className="mt-3 text-muted">
            <strong>Position:</strong> {position?.positionName}
          </p>
          <Alert variant="warning">
            <strong>Important:</strong> This action cannot be undone. Please
            confirm this is your final choice.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVoteModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleVote} disabled={voting}>
            {voting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle className="me-2" />
                Confirm Vote
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PositionBallotPage;
