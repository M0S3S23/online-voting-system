import React from 'react';
import { Navbar, Nav, Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  Building,
  ShieldLock,
  Eye,
  JournalText,
  People,
  GraphUp,
  CheckCircle,
  Clock,
  Globe,
  Key,
  ClipboardCheck,
  Lock
} from 'react-bootstrap-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  // Data for features grid
  const features = [
    {
      icon: <Key size={48} className="text-primary" />,
      title: "End-to-End Encryption",
      description: "All votes are encrypted from submission to tabulation"
    },
    {
      icon: <ClipboardCheck size={48} className="text-success" />,
      title: "Verifiable Ballots",
      description: "Each voter receives a unique verification code"
    },
    {
      icon: <Globe size={48} className="text-info" />,
      title: "Remote Accessibility",
      description: "Vote securely from anywhere with internet access"
    },
    {
      icon: <People size={48} className="text-warning" />,
      title: "Voter Authentication",
      description: "Multi-factor authentication ensures voter identity"
    },
    {
      icon: <GraphUp size={48} className="text-danger" />,
      title: "Real-Time Results",
      description: "View preliminary results as votes are cast"
    },
    {
      icon: <Lock size={48} className="text-secondary" />,
      title: "Tamper-Proof",
      description: "Blockchain technology prevents data manipulation"
    }
  ];

  return (
    <div className="homepage">
      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <section className="hero-section py-5" style={{ 
        background: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(/capitol-building.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <Container className="py-5">
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-4 fw-bold mb-4">Secure Digital Voting Platform</h1>
              <p className="lead mb-4">
                VoteSecure provides government-grade security for your elections with 
                verifiable, transparent, and accessible voting technology.
              </p>
              <div className="d-flex gap-3">
                <Button variant="primary" size="lg">View Active Elections</Button>
                <Button as={Link} to={'/register'} variant="outline-primary" size="lg">Register to Vote</Button>
              </div>
            </Col>
            <Col md={6}>
              {/* Illustration would go here */}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Key Features Banner */}
      <section className="bg-primary text-white py-4">
        <Container>
          <Row className="text-center g-4">
            <Col md={4}>
              <div className="d-flex align-items-center justify-content-center gap-3">
                <ShieldLock size={32} />
                <span className="fs-5">End-to-End Encryption</span>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex align-items-center justify-content-center gap-3">
                <Eye size={32} />
                <span className="fs-5">Full Transparency</span>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex align-items-center justify-content-center gap-3">
                <JournalText size={32} />
                <span className="fs-5">Complete Audit Trail</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Metrics Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="g-4 text-center">
            <Col md={3}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <People size={48} className="text-primary mb-3" />
                  <h3 className="mb-0">24</h3>
                  <p className="text-muted">Active Elections</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <Building size={48} className="text-success mb-3" />
                  <h3 className="mb-0">1,842</h3>
                  <p className="text-muted">Registered Voters</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <CheckCircle size={48} className="text-info mb-3" />
                  <h3 className="mb-0">12,394</h3>
                  <p className="text-muted">Votes Cast</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <ShieldLock size={48} className="text-warning mb-3" />
                  <h3 className="mb-0">100%</h3>
                  <p className="text-muted">Security Rating</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Platform Features */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">Platform Features</h2>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} md={4}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <div className="mb-3">{feature.icon}</div>
                    <h4>{feature.title}</h4>
                    <p className="text-muted">{feature.description}</p>
                    <Button variant="link" className="px-0">Learn more →</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Active Elections */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Active Elections</h2>
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="border-0 shadow">
                <Card.Body className="p-4">
                  <Row className="align-items-center">
                    <Col md={8}>
                      <h4 className="mb-1">2023 Student Council Elections</h4>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="badge bg-success">Active</span>
                        <span className="text-muted">Ends in 3 days</span>
                      </div>
                      <p className="mb-0">
                        <span className="fw-bold">4,291 votes</span> · 12 candidates
                      </p>
                    </Col>
                    <Col md={4} className="text-end">
                      <Button variant="primary" size="lg">Vote Now</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-primary text-white">
        <Container className="text-center">
          <h2 className="mb-4">Ready to participate in our secure elections?</h2>
          <div className="d-flex justify-content-center gap-3">
            <Button as={Link} to={'/register'} variant="light" size="lg">Register Now</Button>
            <Button variant="outline-light" size="lg">View Elections</Button>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;