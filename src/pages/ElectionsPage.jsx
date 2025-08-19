import React, { useState } from 'react';
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
  Alert
} from 'react-bootstrap';
import { 
  Search,
  ShieldCheck,
  PersonCircle,
  Calendar,
  People,
  BarChart
} from 'react-bootstrap-icons';
import Footer from '../components/Footer';

const ElectionsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock election data
  const elections = [
    {
      id: 1,
      title: "Presidential Election 2024",
      status: "active",
      description: "National Presidential Election for the year 2024",
      startDate: "15/01/2024",
      endDate: "15/01/2024",
      totalVotes: 1247,
      candidates: 3,
      turnout: "83%",
      candidatesList: [
        { name: "Robert Anderson", party: "Democratic Party" },
        { name: "Jennifer Martinez", party: "Republican Party" },
        { name: "Thomas Wright", party: "Independent" }
      ]
    },
    {
      id: 2,
      title: "Local Mayor Election for Springfield",
      status: "upcoming",
      description: "Municipal election for Springfield mayor",
      startDate: "01/03/2024",
      endDate: "15/03/2024",
      totalVotes: 0,
      candidates: 2,
      turnout: "0%",
      candidatesList: [
        { name: "Sarah Johnson", party: "Progressive Party" },
        { name: "Michael Chen", party: "Unity Party" }
      ]
    },
    {
      id: 3,
      title: "School Board Election 2023",
      status: "completed",
      description: "Annual school board member election",
      startDate: "10/10/2023",
      endDate: "20/10/2023",
      totalVotes: 892,
      candidates: 4,
      turnout: "78%",
      candidatesList: []
    }
  ];

  // Filter elections based on active filter and search query
  const filteredElections = elections.filter(election => {
    const matchesFilter = activeFilter === 'all' || 
                         election.status === activeFilter;
    const matchesSearch = election.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         election.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="elections-page">
      {/* Navigation Bar */}
      <nav className="navbar navbar-dark bg-dark">
        <Container>
          <span className="navbar-brand fw-bold">VoteSecure</span>
          <div className="d-flex align-items-center">
            <Nav className="me-4">
              <Nav.Link className="text-white">Dashboard</Nav.Link>
              <Nav.Link className="text-white active">Elections</Nav.Link>
            </Nav>
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
                variant={activeFilter === 'all' ? 'primary' : 'outline-secondary'}
                onClick={() => setActiveFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={activeFilter === 'active' ? 'primary' : 'outline-secondary'}
                onClick={() => setActiveFilter('active')}
              >
                Active
              </Button>
              <Button 
                variant={activeFilter === 'upcoming' ? 'primary' : 'outline-secondary'}
                onClick={() => setActiveFilter('upcoming')}
              >
                Upcoming
              </Button>
              <Button 
                variant={activeFilter === 'completed' ? 'primary' : 'outline-secondary'}
                onClick={() => setActiveFilter('completed')}
              >
                Completed
              </Button>
            </div>
          </Col>
        </Row>

        {/* Election Listings */}
        <Row className="g-4">
          {filteredElections.length > 0 ? (
            filteredElections.map(election => (
              <Col key={election.id} lg={6}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h4 className="mb-0">{election.title}</h4>
                      <Badge 
                        bg={
                          election.status === 'active' ? 'success' : 
                          election.status === 'upcoming' ? 'primary' : 'secondary'
                        }
                      >
                        {election.status.charAt(0).toUpperCase() + election.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-muted mb-4">{election.description}</p>
                    
                    {/* Election Stats */}
                    <Row className="mb-4 g-3">
                      <Col xs={4}>
                        <div className="d-flex align-items-center">
                          <People size={18} className="me-2 text-muted" />
                          <div>
                            <small className="text-muted d-block">Total Votes</small>
                            <span className="fw-bold">{election.totalVotes.toLocaleString()}</span>
                          </div>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div className="d-flex align-items-center">
                          <PersonCircle size={18} className="me-2 text-muted" />
                          <div>
                            <small className="text-muted d-block">Candidates</small>
                            <span className="fw-bold">{election.candidates}</span>
                          </div>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div className="d-flex align-items-center">
                          <BarChart size={18} className="me-2 text-muted" />
                          <div>
                            <small className="text-muted d-block">Turnout</small>
                            <span className="fw-bold">{election.turnout}</span>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    {/* Candidates List */}
                    {election.candidatesList.length > 0 && (
                      <div className="mb-4">
                        <h6 className="mb-2">Candidates:</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {election.candidatesList.map((candidate, index) => (
                            <Badge 
                              key={index} 
                              bg="light" 
                              text="dark" 
                              className="d-flex align-items-center"
                            >
                              <PersonCircle size={16} className="me-1" />
                              {candidate.name} - {candidate.party}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Dates and Action Button */}
                    <div className="d-flex justify-content-between align-items-end">
                      <div>
                        <small className="text-muted d-block">Starts: {election.startDate}</small>
                        <small className="text-muted d-block">Ends: {election.endDate}</small>
                      </div>
                      <div>
                        {election.status === 'active' ? (
                          <Button variant="primary">Vote Now</Button>
                        ) : (
                          <Button variant="outline-primary">View Details</Button>
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
                <h5 className="text-muted">No elections found matching your criteria</h5>
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
                  All votes are encrypted end-to-end and verified through multiple security layers. 
                  Your privacy is protected while maintaining complete transparency in the democratic process.
                </p>
              </div>
            </Alert>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ElectionsPage;