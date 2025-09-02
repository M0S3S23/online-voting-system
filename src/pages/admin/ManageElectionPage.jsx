// src/pages/admin/ManageElectionPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Button,
  Row,
  Col,
  Form,
  Table,
  Badge,
  Tabs,
  Tab,
  Spinner,
  Alert,
} from "react-bootstrap";
import AdminLayout from "../../components/admin/AdminLayout";

const ManageElectionPage = () => {
  const { electionId } = useParams();
  const [election, setElection] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch election details
  useEffect(() => {
    const fetchElection = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/elections/${electionId}`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || "Failed to load election");
        }
        const data = await res.json();
        setElection(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchElection();
  }, [electionId]);

  // Toggle candidate approval
  const toggleCandidateApproval = async (candidateId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/elections/${electionId}/candidates/${candidateId}/toggle-approval`,
        { method: "PATCH", credentials: "include" }
      );
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to update candidate");
      }
      setElection((prev) => ({
        ...prev,
        candidates: prev.candidates.map((c) =>
          c._id === candidateId ? { ...c, approved: !c.approved } : c
        ),
      }));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="d-flex justify-content-center align-items-center py-5">
          <Spinner animation="border" />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <Alert variant="danger">{error}</Alert>
      </AdminLayout>
    );
  }

  if (!election) {
    return (
      <AdminLayout>
        <p>No election found.</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {(darkMode) => {
        const textColor = darkMode ? "#f8f9fa" : "#212529";
        const cardBg = darkMode ? "#27293d" : "#ffffff";
        const tableVariant = darkMode ? "dark" : "light";

        return (
          <div>
            <Row className="mb-4">
              <Col>
                <h2 className="fw-bold" style={{ color: textColor }}>
                  Manage Election: {election.title}
                </h2>
                <p style={{ color: textColor }}>{election.description}</p>
              </Col>
              <Col className="text-end">
                <Badge bg="info" className="fs-6 p-2">
                  {election.status}
                </Badge>
              </Col>
            </Row>

            <Tabs defaultActiveKey="details" className="mb-3">
              {/* Election Details Tab */}
              <Tab eventKey="details" title="Details">
                <Card style={{ background: cardBg, color: textColor }}>
                  <Card.Body>
                    <Form>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue={election.title}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select defaultValue={election.status}>
                              <option value="upcoming">Upcoming</option>
                              <option value="ongoing">Ongoing</option>
                              <option value="completed">Completed</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                              type="date"
                              defaultValue={election.startDate?.slice(0, 10)}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                              type="date"
                              defaultValue={election.endDate?.slice(0, 10)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button variant="primary">Save Changes</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab>

              {/* Positions Tab */}
              <Tab eventKey="positions" title="Positions">
                <Card style={{ background: cardBg, color: textColor }}>
                  <Card.Body>
                    <h5 className="mb-3">Positions</h5>
                    <Table bordered hover responsive variant={tableVariant}>
                      <thead>
                        <tr>
                          <th>Position</th>
                          <th>Seats</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {election.positions.length === 0 ? (
                          <tr>
                            <td colSpan="3" className="text-center">
                              No positions added yet.
                            </td>
                          </tr>
                        ) : (
                          election.positions.map((pos, idx) => (
                            <tr key={idx}>
                              <td>{pos.positionName}</td>
                              <td>{pos.seats}</td>
                              <td>{pos.description}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                    <Button variant="success">+ Add Position</Button>
                  </Card.Body>
                </Card>
              </Tab>

              {/* Candidates Tab */}
              <Tab eventKey="candidates" title="Candidates">
                <Card style={{ background: cardBg, color: textColor }}>
                  <Card.Body>
                    <h5 className="mb-3">Candidates</h5>
                    <Table bordered hover responsive variant={tableVariant}>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Party</th>
                          <th>Position</th>
                          <th>Approved</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {election.candidates.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="text-center">
                              No candidates yet.
                            </td>
                          </tr>
                        ) : (
                          election.candidates.map((cand) => (
                            <tr key={cand._id}>
                              <td>{cand.userId?.firstName || "User"} </td>
                              <td>{cand.party}</td>
                              <td>{cand.position}</td>
                              <td>
                                {cand.approved ? (
                                  <Badge bg="success">Yes</Badge>
                                ) : (
                                  <Badge bg="danger">No</Badge>
                                )}
                              </td>
                              <td>
                                <Button
                                  size="sm"
                                  variant={
                                    cand.approved ? "warning" : "success"
                                  }
                                  onClick={() =>
                                    toggleCandidateApproval(cand._id)
                                  }
                                >
                                  {cand.approved
                                    ? "Revoke Approval"
                                    : "Approve"}
                                </Button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Tab>
            </Tabs>
          </div>
        );
      }}
    </AdminLayout>
  );
};

export default ManageElectionPage;
