import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  ListGroup,
  Badge,
  Alert,
  Spinner,
} from "react-bootstrap";
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
  ArrowRight,
} from "react-bootstrap-icons";
import Footer from "../components/Footer";
import AppHeader from "../components/AppHeader";

const VoterDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [elections, setElections] = useState([]);
  const [user, setUser] = useState({
    name: "",
    id: "",
    avatar: <PersonCircle size={40} />,
    status: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [electionsRes, meRes] = await Promise.all([
          fetch("http://localhost:3000/api/elections", {
            credentials: "include",
          }),
          fetch("http://localhost:3000/api/users/me", {
            credentials: "include",
          }),
        ]);
        if (!electionsRes.ok) throw new Error("Failed to fetch elections");
        const electionsData = await electionsRes.json();
        setElections(electionsData || []);

        if (meRes.ok) {
          const me = await meRes.json();
          const displayName =
            [me.firstName, me.lastName].filter(Boolean).join(" ") ||
            me.email ||
            "User";
          setUser((prev) => ({ ...prev, name: displayName }));
        } else {
          setUser((prev) => ({ ...prev, name: "User" }));
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const activeElections = elections.filter((e) => e.status === "ongoing");
  const totalElections = elections.length;

  return (
    <div className="voter-dashboard">
      <AppHeader active="Dashboard" />

      {/* Main Content */}
      <Container className="py-4">
        {loading && (
          <div className="text-center my-5">
            <Spinner animation="border" role="status" className="mb-3">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <div>Loading dashboard...</div>
          </div>
        )}
        {error && (
          <Alert variant="danger" className="my-3">
            {error}
          </Alert>
        )}

        {/* Welcome Section */}
        <Row className="mb-4 align-items-center">
          <Col md="auto" className="me-3">
            {user.avatar}
          </Col>
          <Col>
            <h2 className="mb-1">Welcome{user.name ? `, ${user.name}` : ""}</h2>
            <div className="d-flex align-items-center">
              <span className="text-muted me-3">Role: Voter</span>
              <Badge bg="success" className="text-white">
                {activeElections.length} active
              </Badge>
            </div>
          </Col>
        </Row>

        {/* Key Metrics */}
        <Row className="mb-4 g-4">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="d-flex justify-content-center mb-3">
                  <FileEarmarkText size={24} className="text-success" />
                </div>
                <h3 className="mb-1">{activeElections.length}</h3>
                <p className="text-muted mb-0">Active Elections</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="d-flex justify-content-center mb-3">
                  <Files size={24} className="text-primary" />
                </div>
                <h3 className="mb-1">{totalElections}</h3>
                <p className="text-muted mb-0">Total Elections</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="d-flex justify-content-center mb-3">
                  <ShieldCheck size={24} className="text-warning" />
                </div>
                <h3 className="mb-1">Secure</h3>
                <p className="text-muted mb-0">End-to-end encrypted voting</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Row className="mb-4 g-4">
          <Col md={6}>
            <Card className="border-0 bg-primary text-white">
              <Card.Body className="d-flex align-items-center">
                <FileEarmarkText size={32} className="me-3" />
                <div>
                  <h5 className="mb-1">Vote Now</h5>
                  <p className="mb-0 small">
                    See available elections and cast your vote
                  </p>
                </div>
                <Button
                  as={Link}
                  to={"/elections"}
                  variant="light"
                  size="sm"
                  className="ms-auto"
                >
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
                  <h5 className="mb-1">View Results</h5>
                  <p className="mb-0 small">
                    Check current standings and totals
                  </p>
                </div>
                <Button
                  as={Link}
                  to={"/elections"}
                  variant="light"
                  size="sm"
                  className="ms-auto"
                >
                  Go <ArrowRight size={16} />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Active Elections */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Active Elections</h4>
              <Link to="/elections" className="text-decoration-none">
                View All
              </Link>
            </div>
            {activeElections.length > 0 ? (
              activeElections.map((election) => (
                <Card key={election._id} className="mb-3 border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="mb-0">{election.title}</h5>
                      <Badge bg="success">Ongoing</Badge>
                    </div>
                    <p className="text-muted mb-3">{election.description}</p>
                    <Row className="mb-3">
                      <Col xs={4}>
                        <div className="d-flex align-items-center">
                          <People size={16} className="me-2" />
                          <div>
                            <small className="text-muted d-block">
                              Candidates
                            </small>
                            <span className="fw-bold">
                              {(election.candidates || []).length}
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div className="d-flex align-items-center">
                          <Calendar size={16} className="me-2" />
                          <div>
                            <small className="text-muted d-block">Ends</small>
                            <span className="fw-bold">
                              {new Date(election.endDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div className="d-flex align-items-center">
                          <Clock size={16} className="me-2" />
                          <div>
                            <small className="text-muted d-block">Starts</small>
                            <span className="fw-bold">
                              {new Date(
                                election.startDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div className="d-flex gap-2">
                      <Button
                        as={Link}
                        to={`/elections/${election._id}`}
                        variant="primary"
                      >
                        View & Vote
                      </Button>
                      <Button
                        as={Link}
                        to={`/elections/${election._id}`}
                        variant="outline-primary"
                      >
                        View Results
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center text-muted">
                  No active elections right now.
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VoterDashboard;
