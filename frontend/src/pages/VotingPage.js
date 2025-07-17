import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Badge, 
  Form, 
  Modal,
  Alert,
  Breadcrumb
} from 'react-bootstrap';
import { 
  ShieldCheck,
  Lock,
  CheckCircle,
  ArrowLeft,
  PersonCircle,
  Clock,
  People,
  InfoCircle
} from 'react-bootstrap-icons';
import Footer from '../components/Footer';

const VotingPage = () => {
  // Mock election data
  const election = {
    id: 1,
    title: "Presidential Election 2024",
    status: "active",
    description: "National Presidential Election for the year 2024",
    startDate: "15/01/2024",
    endDate: "15/01/2024",
    totalVotes: 1247,
    candidates: 3,
    timeRemaining: "2 days left"
  };

  // Mock candidates data
  const candidates = [
    {
      id: 1,
      name: "Robert Anderson",
      party: "Democratic Party",
      photo: <PersonCircle size={80} />,
      bio: "Former governor with 10 years of public service experience."
    },
    {
      id: 2,
      name: "Jennifer Martinez",
      party: "Republican Party",
      photo: <PersonCircle size={80} />,
      bio: "Business leader and political newcomer."
    },
    {
      id: 3,
      name: "Thomas Wright",
      party: "Independent",
      photo: <PersonCircle size={80} />,
      bio: "Environmental activist and community organizer."
    }
  ];

  // State management
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [otp, setOtp] = useState('');
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [selectedCandidateDetails, setSelectedCandidateDetails] = useState(null);

  // Handlers
  const handleVoteSubmit = () => {
    setShowModal(true);
  };

  const handleConfirmVote = () => {
    // In a real app, you would verify OTP here
    setShowModal(false);
    setShowSuccess(true);
    // Reset selection after delay
    setTimeout(() => {
      setSelectedCandidate(null);
      setShowSuccess(false);
    }, 3000);
  };

  const viewCandidateDetails = (candidate) => {
    setSelectedCandidateDetails(candidate);
    setShowCandidateModal(true);
  };

  return (
    <div className="voting-page">
      {/* Navigation Bar */}
      <nav className="navbar navbar-dark bg-dark">
        <Container>
          <span className="navbar-brand fw-bold">VoteSecure</span>
          <div className="d-flex align-items-center">
            <a href="#dashboard" className="text-white me-4">Dashboard</a>
            <a href="#elections" className="text-white me-4">Elections</a>
            <div className="dropdown">
              <button className="btn btn-outline-light dropdown-toggle" type="button">
                John Smith
              </button>
            </div>
          </div>
        </Container>
      </nav>

      {/* Main Content */}
      <Container className="py-4">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item href="/elections">Elections</Breadcrumb.Item>
          <Breadcrumb.Item active>{election.title}</Breadcrumb.Item>
        </Breadcrumb>

        {/* Election Overview Banner */}
        <Card className="mb-4 border-0 shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h2 className="mb-1">{election.title}</h2>
                <Badge bg={election.status === 'active' ? 'success' : 'primary'}>
                  {election.status.charAt(0).toUpperCase() + election.status.slice(1)}
                </Badge>
              </div>
              <Button variant="outline-secondary" size="sm">
                <ArrowLeft className="me-1" /> Back to Elections
              </Button>
            </div>
            
            <p className="mb-4">{election.description}</p>
            
            <Row>
              <Col md={4}>
                <div className="d-flex align-items-center mb-2">
                  <Clock size={18} className="me-2 text-muted" />
                  <div>
                    <small className="text-muted d-block">Voting Period</small>
                    <span>{election.startDate} - {election.endDate}</span>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="d-flex align-items-center mb-2">
                  <People size={18} className="me-2 text-muted" />
                  <div>
                    <small className="text-muted d-block">Total Candidates</small>
                    <span>{election.candidates}</span>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="d-flex align-items-center mb-2">
                  <InfoCircle size={18} className="me-2 text-muted" />
                  <div>
                    <small className="text-muted d-block">Time Remaining</small>
                    <span>{election.timeRemaining}</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Voting Success Alert */}
        {showSuccess && (
          <Alert variant="success" className="mb-4">
            <CheckCircle className="me-2" />
            Your vote has been successfully cast!
          </Alert>
        )}

        {/* Candidate Selection Section */}
        <Card className="mb-4 border-0 shadow-sm">
          <Card.Body>
            <h4 className="mb-4">Select Your Candidate</h4>
            
            <Row className="g-4">
              {candidates.map(candidate => (
                <Col key={candidate.id} md={6} lg={4}>
                  <Card 
                    className={`h-100 ${selectedCandidate === candidate.id ? 'border-primary' : ''}`}
                    onClick={() => setSelectedCandidate(candidate.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Card.Body className="text-center">
                      <div className="mb-3">
                        {candidate.photo}
                      </div>
                      <h5 className="mb-1">{candidate.name}</h5>
                      <p className="text-muted mb-3">{candidate.party}</p>
                      
                      <Form.Check
                        type="radio"
                        id={`candidate-${candidate.id}`}
                        name="candidateSelection"
                        checked={selectedCandidate === candidate.id}
                        onChange={() => setSelectedCandidate(candidate.id)}
                        label="Select this candidate"
                        className="mb-3"
                      />
                      
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          viewCandidateDetails(candidate);
                        }}
                      >
                        View Profile
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>

        {/* Vote Submission */}
        {selectedCandidate && (
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Review Your Selection</h5>
              <p className="mb-4">
                You have selected <strong>{candidates.find(c => c.id === selectedCandidate).name}</strong>.
                Please confirm your vote below.
              </p>
              
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleVoteSubmit}
              >
                <Lock className="me-2" />
                Submit Vote
              </Button>
            </Card.Body>
          </Card>
        )}

        {/* Secure Voting Guarantee Banner */}
        <Alert variant="info" className="d-flex align-items-center">
          <ShieldCheck size={32} className="me-3 flex-shrink-0" />
          <div>
            <h5 className="mb-1">Secure Voting Guarantee</h5>
            <p className="mb-0">
              All votes are encrypted end-to-end and verified through multiple security layers. 
              Your privacy is protected while maintaining complete transparency in the democratic process.
            </p>
          </div>
        </Alert>
      </Container>

      {/* Footer */}
      <Footer />

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Vote</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You are about to submit your vote for:</p>
          <h5 className="text-center my-3">
            {selectedCandidate && candidates.find(c => c.id === selectedCandidate).name}
          </h5>
          <p className="text-muted text-center mb-4">
            {selectedCandidate && candidates.find(c => c.id === selectedCandidate).party}
          </p>
          
          <p className="mb-3">
            <strong>This action cannot be undone.</strong> Please verify this is your intended selection.
          </p>
          
          <Form.Group className="mb-3">
            <Form.Label>Enter OTP (for demo use any 6 digits)</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="123456" 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmVote}>
            Confirm & Submit Vote
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Candidate Details Modal */}
      <Modal show={showCandidateModal} onHide={() => setShowCandidateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Candidate Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCandidateDetails && (
            <Row>
              <Col md={4} className="text-center">
                {selectedCandidateDetails.photo}
                <h4 className="mt-3">{selectedCandidateDetails.name}</h4>
                <p className="text-muted">{selectedCandidateDetails.party}</p>
              </Col>
              <Col md={8}>
                <h5>Biography</h5>
                <p>{selectedCandidateDetails.bio}</p>
                
                <h5 className="mt-4">Policy Positions</h5>
                <ul>
                  <li>Economic reform and middle-class tax cuts</li>
                  <li>Universal healthcare access</li>
                  <li>Climate change action plan</li>
                  <li>Education funding increases</li>
                </ul>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCandidateModal(false)}>
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={() => {
              setSelectedCandidate(selectedCandidateDetails.id);
              setShowCandidateModal(false);
            }}
          >
            Select This Candidate
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VotingPage;