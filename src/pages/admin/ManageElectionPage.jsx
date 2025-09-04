// src/pages/admin/ManageElectionPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useElection } from "../../contexts/ElectionContext";
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
  Modal,
} from "react-bootstrap";
import AdminLayout from "../../components/admin/AdminLayout";

const ManageElectionPage = () => {
  const { electionId } = useParams();
  const { selectedElection } = useElection();

  const [election, setElection] = useState(selectedElection || null);
  const [editData, setEditData] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(!selectedElection);
  const [error, setError] = useState("");
  const [errorCandidates, setErrorCandidates] = useState("");

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [newPosition, setNewPosition] = useState({
    positionName: "",
    seats: 1,
    description: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [positionToEdit, setPositionToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [positionToDelete, setPositionToDelete] = useState(null);

  // Candidate Details Modal
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Function to open candidate modal
  const openCandidateModal = (candidate) => {
    setSelectedCandidate(candidate);
    setShowCandidateModal(true);
  };


  // Combined useEffect: fetch election + candidates and initialize editData
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      setErrorCandidates("");

      try {
        // Fetch election if not already in context
        let electionData = selectedElection;
        if (!selectedElection) {
          const res = await fetch(
            `http://localhost:3000/api/elections/${electionId}`,
            { credentials: "include" }
          );
          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.message || "Failed to load election");
          }
          electionData = await res.json();
          setElection(electionData);
        }

        // Initialize editData safely
        if (electionData) {
          setEditData({
            title: electionData.title || "",
            description: electionData.description || "",
            status: electionData.status || "upcoming",
            startDate: electionData.startDate?.slice(0, 10) || "",
            endDate: electionData.endDate?.slice(0, 10) || "",
          });
        }

        // Fetch candidates
        const resCand = await fetch(
          `http://localhost:3000/api/elections/${electionId}/candidates`,
          { credentials: "include" }
        );
        if (!resCand.ok) {
          const errData = await resCand.json().catch(() => ({}));
          throw new Error(errData.message || "Failed to load candidates");
        }
        const candidatesData = await resCand.json();
        setCandidates(candidatesData);
      } catch (err) {
        if (!election) setError(err.message);
        else setErrorCandidates(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (electionId) fetchData();
  }, [electionId, selectedElection]);

  // Candidate approval toggle
  const toggleCandidateApproval = async (candidateId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/elections/${electionId}/candidates/${candidateId}/toggleApproval`,
        { method: "PATCH", credentials: "include" }
      );
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to update candidate");
      }
      setCandidates((prev) =>
        prev.map((c) =>
          c._id === candidateId ? { ...c, approved: !c.approved } : c
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // Election edit
  const handleSaveElection = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/elections/${electionId}/editElection`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(editData),
        }
      );
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to update election");
      }
      const updated = await res.json();
      setElection(updated.election);
      alert("Election updated successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  // Position CRUD handlers
  const handleAddPosition = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/elections/${electionId}/positions/add`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(newPosition),
        }
      );
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to add position");
      }
      const updated = await res.json();
      setElection(updated.election);
      setShowModal(false);
      setNewPosition({ positionName: "", seats: 1, description: "" });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditPosition = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/elections/${electionId}/positions/${encodeURIComponent(
          positionToEdit.originalName
        )}/edit`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            newPositionName:
              positionToEdit.positionName !== positionToEdit.originalName
                ? positionToEdit.positionName
                : undefined,
            seats: positionToEdit.seats,
            description: positionToEdit.description,
          }),
        }
      );
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to update position");
      }
      const updated = await res.json();
      setElection(updated.election);
      setShowEditModal(false);
      setPositionToEdit(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeletePosition = async (positionName) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/elections/${electionId}/positions/${positionName}/delete`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ positionName }),
        }
      );
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to delete position");
      }
      const updated = await res.json();
      setElection(updated.election);
    } catch (err) {
      alert(err.message);
    }
  };

  // Render loading/error states
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
                  Manage Election: {election?.title}
                </h2>
                <p style={{ color: textColor }}>{election?.description}</p>
              </Col>
              <Col className="text-end">
                <Badge bg="info" className="fs-6 p-2">
                  {election?.status}
                </Badge>
              </Col>
            </Row>

            {/* Tabs */}
            <Tabs defaultActiveKey="details" className="mb-3">
              {/* Election Details */}
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
                              value={editData?.title || ""}
                              onChange={(e) =>
                                setEditData((prev) => ({
                                  ...prev,
                                  title: e.target.value,
                                }))
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={editData?.description || ""}
                              onChange={(e) =>
                                setEditData((prev) => ({
                                  ...prev,
                                  description: e.target.value,
                                }))
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                              value={editData?.status || "upcoming"}
                              onChange={(e) =>
                                setEditData((prev) => ({
                                  ...prev,
                                  status: e.target.value,
                                }))
                              }
                            >
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
                              value={editData?.startDate || ""}
                              onChange={(e) =>
                                setEditData((prev) => ({
                                  ...prev,
                                  startDate: e.target.value,
                                }))
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                              type="date"
                              value={editData?.endDate || ""}
                              onChange={(e) =>
                                setEditData((prev) => ({
                                  ...prev,
                                  endDate: e.target.value,
                                }))
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button variant="primary" onClick={handleSaveElection}>
                        Save Changes
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab>

              {/* Positions */}
              <Tab eventKey="positions" title="Positions">
                <Card style={{ background: cardBg, color: textColor }}>
                  <Card.Body>
                    <Row className="mb-3">
                      <Col>
                        <h5 className="mb-0">Positions</h5>
                      </Col>
                      <Col className="text-end">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => setShowModal(true)}
                        >
                          + Add Position
                        </Button>
                      </Col>
                    </Row>
                    <Table bordered hover responsive variant={tableVariant}>
                      <thead>
                        <tr>
                          <th>Position</th>
                          <th>Seats</th>
                          <th>Description</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {election.positions?.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No positions added yet.
                            </td>
                          </tr>
                        ) : (
                          election.positions?.map((pos, idx) => (
                            <tr key={idx}>
                              <td>{pos.positionName}</td>
                              <td>{pos.seats}</td>
                              <td>{pos.description}</td>
                              <td className="text-center">
                                <Button
                                  size="sm"
                                  variant="warning"
                                  className="me-2"
                                  onClick={() => {
                                    setPositionToEdit({
                                      ...pos,
                                      originalName: pos.positionName,
                                    });
                                    setShowEditModal(true);
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="danger"
                                  onClick={() => {
                                    setPositionToDelete(pos.positionName);
                                    setShowDeleteModal(true);
                                  }}
                                >
                                  Delete
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

              {/* Candidates */}
              <Tab eventKey="candidates" title="Candidates">
                <Card style={{ background: cardBg, color: textColor }}>
                  <Card.Body>
                    <h5 className="mb-3">Candidates</h5>
                    {loading ? (
                      <div className="text-center">
                        <Spinner animation="border" />
                      </div>
                    ) : errorCandidates ? (
                      <Alert variant="danger">{errorCandidates}</Alert>
                    ) : (
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
                          {candidates.length === 0 ? (
                            <tr>
                              <td colSpan="5" className="text-center">
                                No candidates yet.
                              </td>
                            </tr>
                          ) : (
                            candidates.map((cand) => (
                              <tr key={cand._id}>
                                <td>
                                  {cand.userId
                                    ? `${cand.userId.firstName} ${cand.userId.lastName}`
                                    : "Unknown User"}
                                </td>
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
                                    variant="info"
                                    onClick={() => openCandidateModal(cand)}
                                  >
                                    View Details
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={cand.approved ? "warning" : "success"}
                                    onClick={() => toggleCandidateApproval(cand._id)}
                                    className="me-2"
                                  >
                                    {cand.approved ? "Revoke Approval" : "Approve"}
                                  </Button>
                                </td>

                              </tr>
                            ))
                          )}
                        </tbody>
                      </Table>
                    )}
                  </Card.Body>
                </Card>
              </Tab>
            </Tabs>

            {/* Modals */}
            {/* Add Position Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Add Position</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Position Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={newPosition.positionName}
                      onChange={(e) =>
                        setNewPosition((prev) => ({
                          ...prev,
                          positionName: e.target.value,
                        }))
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Seats</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={newPosition.seats}
                      onChange={(e) =>
                        setNewPosition((prev) => ({
                          ...prev,
                          seats: parseInt(e.target.value, 10),
                        }))
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={newPosition.description}
                      onChange={(e) =>
                        setNewPosition((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="success" onClick={handleAddPosition}>
                  Save Position
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Delete Position Modal */}
            <Modal
              show={showDeleteModal}
              onHide={() => setShowDeleteModal(false)}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Delete Position</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {positionToDelete && (
                  <p>
                    Are you sure you want to delete the position "<b>{positionToDelete}</b>"?
                  </p>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    handleDeletePosition(positionToDelete);
                    setShowDeleteModal(false);
                    setPositionToDelete(null);
                  }}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Edit Position Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Edit Position</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {positionToEdit && (
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Position Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={positionToEdit.positionName}
                        onChange={(e) =>
                          setPositionToEdit((prev) => ({
                            ...prev,
                            positionName: e.target.value,
                          }))
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Seats</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        value={positionToEdit.seats}
                        onChange={(e) =>
                          setPositionToEdit((prev) => ({
                            ...prev,
                            seats: parseInt(e.target.value, 10),
                          }))
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={positionToEdit.description}
                        onChange={(e) =>
                          setPositionToEdit((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />
                    </Form.Group>
                  </Form>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleEditPosition}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={showCandidateModal}
              onHide={() => setShowCandidateModal(false)}
              centered
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Candidate Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedCandidate && (
                  <div>
                    <Row className="mb-3">
                      <Col md={selectedCandidate.poster ? 4 : 12}>
                        {selectedCandidate.poster && (
                          <img
                            src={selectedCandidate.poster}
                            alt="Candidate Poster"
                            className="img-fluid rounded mb-3"
                          />
                        )}
                      </Col>
                      <Col md={selectedCandidate.poster ? 8 : 12}>
                        <p>
                          <strong>Name:</strong>{" "}
                          {selectedCandidate.userId
                            ? `${selectedCandidate.userId.firstName} ${selectedCandidate.userId.lastName}`
                            : "Unknown User"}
                        </p>
                        <p>
                          <strong>Party:</strong> {selectedCandidate.party}
                        </p>
                        <p>
                          <strong>Position:</strong> {selectedCandidate.position}
                        </p>
                        <p>
                          <strong>Manifesto:</strong>
                          <br />
                          {selectedCandidate.manifesto}
                        </p>
                        <p>
                          <strong>Approved:</strong>{" "}
                          {selectedCandidate.approved ? "Yes" : "No"}
                        </p>
                      </Col>
                    </Row>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowCandidateModal(false)}>
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

export default ManageElectionPage;
