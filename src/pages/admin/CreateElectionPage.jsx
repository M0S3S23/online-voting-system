import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col, Table, Modal, Form, Badge, Alert, Spinner } from "react-bootstrap";
import AdminLayout from "../../components/admin/AdminLayout";
import { useNavigate } from "react-router-dom";
import { useElection } from "../../contexts/ElectionContext";

const CreateElectionPage = () => {

  const [viewModal, setViewModal] = useState(false);
  const [viewElection, setViewElection] = useState(null);

  const { setSelectedElection } = useElection();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch elections from backend
  const fetchElections = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/elections/", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to fetch elections");
      }

      const data = await res.json();
      setElections(data); // directly set elections
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchElections();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/elections/createElection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to create election");
      }

      await res.json(); // consume response but ignore return
      await fetchElections(); //

      setShowModal(false);
      setFormData({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
      });
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete election using endpoint http://localhost:3000/api/elections/:id/deleteElection
  const handleDelete = async (electionId) => {
    if (!window.confirm("Are you sure you want to delete this election?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/elections/${electionId}/deleteElection`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.log(errData);
        throw new Error(errData.message || "Failed to delete election");
      }
      setElections((prev) => prev.filter((e) => e._id !== electionId));
    } catch (err) {
      alert(err.message);
    }
  };


  // Map status to badge theme
  const statusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "info";
      case "ongoing":
        return "success";
      case "completed":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <AdminLayout>
      {(darkMode) => {
        const textColor = darkMode ? "#f8f9fa" : "#212529";
        const cardBg = darkMode ? "#27293d" : "#ffffff";
        const headerClass = darkMode ? "bg-dark text-white" : "bg-primary text-white";
        const tableHeader = darkMode ? "table-dark" : "table-light";

        return (
          <div>
            {/* Header Row */}
            <Row className="mb-4">
              <Col>
                <h2 className="fw-bold" style={{ color: textColor }}>
                  Elections Management
                </h2>
                <p style={{ color: textColor }}>View, create, and manage elections.</p>
              </Col>
              <Col className="text-end">
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  + Create New Election
                </Button>
              </Col>
            </Row>

            {/* Error Message */}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Active and Upcoming Elections */}
            <Card className="mb-4 shadow-sm border-0" style={{ background: cardBg, color: textColor }}>
              <Card.Header className={headerClass}>Active & Upcoming Elections</Card.Header>
              <Card.Body>
                {loading ? (
                  <div className="text-center my-4">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : elections.filter(e => e.status === "upcoming" || e.status === "ongoing").length === 0 ? (
                  <p className="text-muted">No active or upcoming elections.</p>
                ) : (
                  <Table hover responsive bordered className="align-middle mb-0">
                    <thead>
                      <tr className={tableHeader}>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {elections
                        .filter(e => e.status === "upcoming" || e.status === "ongoing")
                        .map((election) => (
                          <tr key={election._id} className={tableHeader}>
                            <td className="fw-semibold">{election.title}</td>
                            <td>
                              <Badge
                                bg={statusColor(election.status)}
                                className="px-3 py-2 shadow-sm text-capitalize"
                              >
                                {election.status}
                              </Badge>
                            </td>
                            <td>{election.startDate?.substring(0, 10)}</td>
                            <td>{election.endDate?.substring(0, 10)}</td>
                            <td className="text-center">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                                onClick={() => {
                                  setSelectedElection(election); // 👈 store election in context
                                  navigate(`/admin/elections/${election._id}/manage`);
                                }}
                              >
                                Manage
                              </Button>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                                onClick={() => navigate(`/admin/elections/${election._id}/view`)}
                              >
                                View
                              </Button>


                              <Button variant="outline-danger" size="sm" onClick={() => handleDelete(election._id)}>
                                Delete
                              </Button>
                            </td>

                          </tr>
                        ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>

            {/* Completed Elections */}
            <Card className="shadow-sm border-0" style={{ background: cardBg, color: textColor }}>
              <Card.Header className={headerClass}>Completed Elections</Card.Header>
              <Card.Body>
                {loading ? (
                  <div className="text-center my-4">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : elections.filter(e => e.status === "completed").length === 0 ? (
                  <p className="text-muted">No completed elections yet.</p>
                ) : (
                  <Table hover responsive bordered className="align-middle mb-0">
                    <thead>
                      <tr className={tableHeader}>
                        <th>Title</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {elections
                        .filter(e => e.status === "completed")
                        .map((election) => (
                          <tr key={election._id} className={tableHeader}>
                            <td className="fw-semibold">{election.title}</td>
                            <td>{election.startDate?.substring(0, 10)}</td>
                            <td>{election.endDate?.substring(0, 10)}</td>
                            <td className="text-center">
                              <Button 
                              variant="outline-primary" 
                              size="sm" 
                              className="me-2"
                                onClick={() => navigate(`/admin/elections/${election._id}/view`)}
                              >
                                View Results
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>


            {/* Create Election Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Header closeButton className={headerClass}>
                <Modal.Title>Create New Election</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ background: cardBg, color: textColor }}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Election Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter election title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Short description of the election"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="startDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="endDate">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="text-end">
                    <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">
                      Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                      Create
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>


            {/* View Election Modal */}
            <Modal show={viewModal} onHide={() => setViewModal(false)} centered size="lg">
              <Modal.Header closeButton className={headerClass}>
                <Modal.Title>Election Details</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ background: cardBg, color: textColor }}>
                {viewElection ? (
                  <>
                    {/* Basic Info */}
                    <h5 className="fw-bold">{viewElection.title}</h5>
                    <p className="text-muted">{viewElection.description}</p>

                    <Row className="mb-3">
                      <Col>
                        <strong>Status: </strong>
                        <Badge
                          bg={statusColor(viewElection.status)}
                          className="px-3 py-2 text-capitalize"
                        >
                          {viewElection.status}
                        </Badge>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col>
                        <strong>Start Date:</strong>{" "}
                        {viewElection.startDate?.substring(0, 10)}
                      </Col>
                      <Col>
                        <strong>End Date:</strong>{" "}
                        {viewElection.endDate?.substring(0, 10)}
                      </Col>
                    </Row>

                    {/* Positions Section */}
                    <h6 className="fw-bold mt-4">Positions</h6>
                    {viewElection.positions?.length > 0 ? (
                      <Table bordered size="sm" className="mt-2">
                        <thead>
                          <tr className={tableHeader}>
                            <th>Position</th>
                            <th>Seats</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {viewElection.positions.map((pos, i) => (
                            <tr key={i}>
                              <td>{pos.positionName}</td>
                              <td>{pos.seats}</td>
                              <td>{pos.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <p className="text-muted">No positions added yet.</p>
                    )}

                    {/* Candidates Section */}
                    <h6 className="fw-bold mt-4">Candidates</h6>
                    {viewElection.candidates?.length > 0 ? (
                      <Table bordered hover responsive size="sm" className="mt-2">
                        <thead>
                          <tr className={tableHeader}>
                            <th>Name / User ID</th>
                            <th>Party</th>
                            <th>Position</th>
                            <th>Approved</th>
                          </tr>
                        </thead>
                        <tbody>
                          {viewElection.candidates.map((c, i) => (
                            <tr key={i}>
                              <td>{c.userId}</td> {/* Ideally you'd populate with user's name */}
                              <td>{c.party}</td>
                              <td>{c.position}</td>
                              <td>
                                <Badge bg={c.approved ? "success" : "warning"}>
                                  {c.approved ? "Approved" : "Pending"}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <p className="text-muted">No candidates yet.</p>
                    )}

                    {/* Votes Section */}
                    <h6 className="fw-bold mt-4">Votes</h6>
                    {viewElection.votes?.length > 0 ? (
                      <p>
                        <strong>Total Votes:</strong> {viewElection.votes.length}
                      </p>
                    ) : (
                      <p className="text-muted">No votes recorded yet.</p>
                    )}
                  </>
                ) : (
                  <p>No election selected.</p>
                )}
              </Modal.Body>
              <Modal.Footer style={{ background: cardBg }}>
                <Button variant="secondary" onClick={() => setViewModal(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>


          </div>
        );
      }}
    </AdminLayout>
  );
};

export default CreateElectionPage;
