import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
  Badge,
  Form,
} from "react-bootstrap";
import {
  PersonCircle,
  Envelope,
  Telephone,
  Building,
  Briefcase,
  CardText,
  PencilSquare,
  X,
  Check2,
} from "react-bootstrap-icons";
import AppHeader from "../components/AppHeader";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isCandidate, setIsCandidate] = useState(false);
  const [candidateElections, setCandidateElections] = useState([]);

  const [editing, setEditing] = useState({ email: false, phone: false });
  const [draft, setDraft] = useState({ email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  useEffect(() => {
    const fetchMe = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("http://localhost:3000/api/users/me", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load profile");
        const data = await res.json();
        setUser(data);
        setDraft({ email: data.email || "", phone: data.phone || "" });

        // Check if user is a candidate
        const candidateRes = await fetch(
          "http://localhost:3000/api/users/is-candidate",
          { credentials: "include" }
        );
        if (!candidateRes.ok) throw new Error("Failed to check candidate status");
        const candidateData = await candidateRes.json();
        setIsCandidate(candidateData.isCandidate);
        setCandidateElections(candidateData.elections || []);

      } catch (err) {
        console.error("Profile load error:", err);
        setError("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  const startEdit = (field) => setEditing((e) => ({ ...e, [field]: true }));
  const cancelEdit = (field) => {
    setEditing((e) => ({ ...e, [field]: false }));
    setDraft((d) => ({ ...d, [field]: user?.[field] || "" }));
    setSubmitError("");
    setSubmitSuccess("");
  };

  const submitField = async (field) => {
    try {
      setSubmitting(true);
      setSubmitError("");
      setSubmitSuccess("");
      const payload = { [field]: draft[field] };
      const res = await fetch("http://localhost:3000/api/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Failed to update");
      // success: update local state
      setUser((u) => ({ ...u, [field]: data.user?.[field] ?? draft[field] }));
      setEditing((e) => ({ ...e, [field]: false }));
      setSubmitSuccess("Saved");
      setTimeout(() => setSubmitSuccess(""), 1500);
    } catch (err) {
      setSubmitError(err.message || "Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  const renderHeader = () => (
    <div className="bg-dark text-white py-4">
      <Container>
        <Row className="align-items-center">
          <Col md="auto" className="mb-3 mb-md-0">
            <PersonCircle size={64} className="me-3" />
          </Col>
          <Col>
            <h2 className="mb-1">
              {user?.firstName || ""} {user?.lastName || ""}
            </h2>
            <div className="d-flex align-items-center gap-2">
              <Badge bg={user?.isAdmin ? "danger" : "secondary"}>
                {user?.isAdmin ? "Admin" : "Voter"}
              </Badge>
              <small className="text-light-50">
                Member since{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "-"}
              </small>
            </div>
          </Col>
          <Col md="auto">
            {/* Show Candidate Dashboard button if user is a candidate */}
            {isCandidate && (
              <Button
                variant="info"
              // href="/candidate-dashboard"
              >
                Candidate Dashboard
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );

  return (
    <div
      className="profile-page"
      style={{ minHeight: "100vh", backgroundColor: "#f5f7fb" }}
    >
      <AppHeader />

      {loading && (
        <Container className="py-5">
          <div className="text-center my-5">
            <Spinner animation="border" role="status" className="mb-3">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <div>Loading profile...</div>
          </div>
        </Container>
      )}

      {!loading && error && (
        <Container className="py-4">
          <Alert variant="danger">{error}</Alert>
        </Container>
      )}

      {!loading && !error && user && (
        <>
          {renderHeader()}

          <Container className="py-4">
            {submitError && (
              <Alert variant="danger" className="mb-3">
                {submitError}
              </Alert>
            )}
            {submitSuccess && (
              <Alert variant="success" className="mb-3">
                {submitSuccess}
              </Alert>
            )}
            <Row className="g-4">
              {/* Left: Summary Card */}
              <Col lg={4}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <PersonCircle size={48} className="me-3 text-primary" />
                      <div>
                        <h5 className="mb-0">
                          {user.firstName} {user.lastName}
                        </h5>
                        <small className="text-muted">{user.email}</small>
                      </div>
                    </div>
                    <Row className="g-2">
                      <Col xs={6}>
                        <div className="p-2 bg-light rounded text-center">
                          <div className="small text-muted">Role</div>
                          <div className="fw-bold">
                            {user.isAdmin ? "Admin" : "Voter"}
                          </div>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div className="p-2 bg-light rounded text-center">
                          <div className="small text-muted">Joined</div>
                          <div className="fw-bold">
                            {user.createdAt
                              ? new Date(user.createdAt).toLocaleDateString()
                              : "-"}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              {/* Right: Details */}
              <Col lg={8}>
                <Card className="shadow-sm mb-4">
                  <Card.Header>
                    <strong>Contact</strong>
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-3">
                      <Col md={6}>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <Envelope className="me-2 text-muted" />
                            <div>
                              <div className="text-muted small">Email</div>
                              {!editing.email ? (
                                <div className="fw-semibold">{user.email}</div>
                              ) : (
                                <div className="d-flex align-items-center gap-2">
                                  <Form.Control
                                    type="email"
                                    size="sm"
                                    value={draft.email}
                                    onChange={(e) =>
                                      setDraft((d) => ({
                                        ...d,
                                        email: e.target.value,
                                      }))
                                    }
                                    placeholder="Enter email"
                                  />
                                  <Button
                                    variant="success"
                                    size="sm"
                                    disabled={submitting}
                                    onClick={() => submitField("email")}
                                  >
                                    <Check2 />
                                  </Button>
                                  <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => cancelEdit("email")}
                                  >
                                    <X />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                          {!editing.email && (
                            <Button
                              variant="link"
                              className="p-0"
                              onClick={() => startEdit("email")}
                            >
                              <PencilSquare />
                            </Button>
                          )}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <Telephone className="me-2 text-muted" />
                            <div>
                              <div className="text-muted small">Phone</div>
                              {!editing.phone ? (
                                <div className="fw-semibold">
                                  {user.phone || "-"}
                                </div>
                              ) : (
                                <div className="d-flex align-items-center gap-2">
                                  <Form.Control
                                    type="text"
                                    size="sm"
                                    value={draft.phone}
                                    onChange={(e) =>
                                      setDraft((d) => ({
                                        ...d,
                                        phone: e.target.value,
                                      }))
                                    }
                                    placeholder="Enter phone"
                                  />
                                  <Button
                                    variant="success"
                                    size="sm"
                                    disabled={submitting}
                                    onClick={() => submitField("phone")}
                                  >
                                    <Check2 />
                                  </Button>
                                  <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => cancelEdit("phone")}
                                  >
                                    <X />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                          {!editing.phone && (
                            <Button
                              variant="link"
                              className="p-0"
                              onClick={() => startEdit("phone")}
                            >
                              <PencilSquare />
                            </Button>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <Card className="shadow-sm">
                  <Card.Header>
                    <strong>Academic</strong>
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-3">
                      <Col md={6}>
                        <div className="d-flex align-items-center">
                          <CardText className="me-2 text-muted" />
                          <div>
                            <div className="text-muted small">Student ID</div>
                            <div className="fw-semibold">
                              {user.studentId || "-"}
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="d-flex align-items-center">
                          <Building className="me-2 text-muted" />
                          <div>
                            <div className="text-muted small">School</div>
                            <div className="fw-semibold">
                              {user.school || "-"}
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="d-flex align-items-center">
                          <Briefcase className="me-2 text-muted" />
                          <div>
                            <div className="text-muted small">Department</div>
                            <div className="fw-semibold">
                              {user.department || "-"}
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="d-flex align-items-center">
                          <CardText className="me-2 text-muted" />
                          <div>
                            <div className="text-muted small">
                              Year Of Study
                            </div>
                            <div className="fw-semibold">
                              {user.yearOfStudy || "-"}
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
};

export default Profile;
