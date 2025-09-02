import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { Container, Card, Row, Col, Button, ListGroup, Badge } from 'react-bootstrap';
import { 
  PersonCircle, 
  FileEarmarkText, 
  Files, 
  CheckCircle, 
  ShieldCheck,
  Calendar,
  People,
  BarChart,
  Clock,
  ArrowRight
} from 'react-bootstrap-icons';
import { Nav } from 'react-bootstrap';
import { fetchElections } from '../services/elections';
import Footer from '../components/Footer';

const VoterDashboard = () => {
  // Mock user data
  const user = {
    name: "John Smith",
    id: "VOT001",
    avatar: <PersonCircle size={40} />,
    status: "Pending Vote"
  };

  // Metrics data
  const metrics = [
    { title: "Active Elections", value: 1, icon: <FileEarmarkText size={24} className="text-success" /> },
    { title: "Total Elections", value: 2, icon: <Files size={24} className="text-primary" /> },
    { title: "My Participation", value: 0, icon: <CheckCircle size={24} className="text-purple" /> },
    { title: "Security Score", value: "100%", icon: <ShieldCheck size={24} className="text-warning" /> }
  ];

  const [firstElectionId, setFirstElectionId] = useState('');
  const activeElections = [
    {
      title: "Presidential Election 2024",
      status: "Available",
      description: "National Presidential Election for the year 2024",
      stats: [
        { label: "Total Votes cast", value: "1,247", icon: <People size={16} /> },
        { label: "Candidates", value: 3, icon: <PersonCircle size={16} /> },
        { label: "Ends", value: "15/01/2024", icon: <Calendar size={16} /> }
      ]
    }
  ];

  useEffect(() => {
    const load = async () => {
      try {
        const elections = await fetchElections();
        if (Array.isArray(elections) && elections.length > 0) {
          setFirstElectionId(elections[0]._id);
        }
      } catch {}
    };
    load();
  }, []);

  // Recent activity
  const recentActivity = [
    { action: "Account Login", description: "Successfully signed in to your account", time: "12:09:30", icon: <FileEarmarkText size={20} className="text-primary" /> },
    { action: "Security Verification", description: "Account security verified successfully", time: "2 hours ago", icon: <ShieldCheck size={20} className="text-purple" /> }
  ];

  return (
    <div className="voter-dashboard">
      {/* Navigation Bar */}
      <nav className="navbar navbar-dark bg-dark">
        <Container>
          <span className="navbar-brand fw-bold">VoteSecure</span>
          <div className="d-flex align-items-center">
            <Nav className="me-4">
              <Nav.Link className="text-white">Dashboard</Nav.Link>
              <Nav.Link as={Link} to={'/elections'} className="text-white">Elections</Nav.Link>
              <Nav.Link as={Link} to={`/elections/${firstElectionId || 'placeholder'}/apply`} className="text-white">Apply</Nav.Link>
            </Nav>
            <div className="dropdown">
              <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                {user.name}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#profile">Profile</a></li>
                <li><a className="dropdown-item" href="#settings">Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#logout">Logout</a></li>
              </ul>
            </div>
          </div>
        </Container>
      </nav>

      {/* Main Content */}
      <Container className="py-4">
        {/* Welcome Section */}
        <Row className="mb-4 align-items-center">
          <Col md="auto" className="me-3">
            {user.avatar}
          </Col>
          <Col>
            <h2 className="mb-1">Welcome back, {user.name}</h2>
            <div className="d-flex align-items-center">
              <span className="text-muted me-3">Voter ID: {user.id} | Role: Voter</span>
              <Badge bg="warning" className="text-dark">
                {user.status}
              </Badge>
            </div>
          </Col>
        </Row>

        {/* Key Metrics */}
        <Row className="mb-4 g-4">
          {metrics.map((metric, index) => (
            <Col key={index} md={3}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center mb-3">
                    {metric.icon}
                  </div>
                  <h3 className="mb-1">{metric.value}</h3>
                  <p className="text-muted mb-0">{metric.title}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Quick Actions */}
        <Row className="mb-4 g-4">
          <Col md={6}>
            <Card className="border-0 bg-primary text-white">
              <Card.Body className="d-flex align-items-center">
                <FileEarmarkText size={32} className="me-3" />
                <div>
                  <h5 className="mb-1">Vote Now</h5>
                  <p className="mb-0 small">Cast your vote in active elections</p>
                </div>
                <Button as={Link} to={'/elections'} variant="light" size="sm" className="ms-auto">
                  Go <ArrowRight size={16} />
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="border-0 bg-success text-white">
              <Card.Body className="d-flex align-items-center">
                <BarChart size={32} className="me-3" />
                <div>
                  <h5 className="mb-1">Apply to Stand</h5>
                  <p className="mb-0 small">Submit your candidacy application</p>
                </div>
                <Button as={Link} to={`/elections/${firstElectionId || 'placeholder'}/apply`} variant="light" size="sm" className="ms-auto">Go <ArrowRight size={16} /></Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Active Elections */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Active Elections</h4>
              <a href="#view-all" className="text-decoration-none">View All</a>
            </div>
            {activeElections.map((election, index) => (
              <Card key={index} className="mb-3 border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="mb-0">{election.title}</h5>
                    <Badge bg="success">{election.status}</Badge>
                  </div>
                  <p className="text-muted mb-3">{election.description}</p>
                  <Row className="mb-3">
                    {election.stats.map((stat, i) => (
                      <Col key={i} xs={4}>
                        <div className="d-flex align-items-center">
                          <span className="me-2">{stat.icon}</span>
                          <div>
                            <small className="text-muted d-block">{stat.label}</small>
                            <span className="fw-bold">{stat.value}</span>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                  <Button as={Link} to={'/elections/:id/vote'} variant="primary">Vote Now</Button>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>

        {/* Recent Activity */}
        <Row>
          <Col>
            <h4 className="mb-3">Recent Activity</h4>
            <Card className="border-0 shadow-sm">
              <ListGroup variant="flush">
                {recentActivity.map((activity, index) => (
                  <ListGroup.Item key={index} className="d-flex align-items-center">
                    <div className="me-3">
                      {activity.icon}
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0">{activity.action}</h6>
                      <small className="text-muted">{activity.description}</small>
                    </div>
                    <small className="text-muted">{activity.time}</small>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VoterDashboard;