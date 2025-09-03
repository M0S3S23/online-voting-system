import React, { useState } from "react";
import { Button, Card, Row, Col, Table, Modal, Form } from "react-bootstrap";
import AdminLayout from "../../components/admin/AdminLayout";

const CreateElectionPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  // Dummy data (replace with API later)
  const [elections, setElections] = useState([
    { id: 1, title: "Student Council 2025", status: "upcoming", startDate: "2025-09-10", endDate: "2025-09-15" },
    { id: 2, title: "Faculty Senate", status: "ongoing", startDate: "2025-08-25", endDate: "2025-09-05" },
  ]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newElection = {
      id: elections.length + 1,
      title: formData.title,
      status: "upcoming",
      startDate: formData.startDate,
      endDate: formData.endDate,
    };
    setElections([...elections, newElection]);
    setShowModal(false);
    setFormData({ title: "", description: "", startDate: "", endDate: "" });
  };

  return (
    <AdminLayout>
      {/* Header Row */}
      <Row className="mb-4">
        <Col>
          <h2>Elections Management</h2>
          <p className="text-muted">View, create, and manage elections.</p>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            + Create New Election
          </Button>
        </Col>
      </Row>

      {/* Elections List */}
      <Card className="mb-4 shadow-sm">
        <Card.Header>Active & Upcoming Elections</Card.Header>
        <Card.Body>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {elections.map((election) => (
                <tr key={election.id}>
                  <td>{election.title}</td>
                  <td>
                    <span
                      className={`badge ${
                        election.status === "upcoming"
                          ? "bg-warning"
                          : election.status === "ongoing"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {election.status}
                    </span>
                  </td>
                  <td>{election.startDate}</td>
                  <td>{election.endDate}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      View
                    </Button>
                    <Button variant="outline-danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Create Election Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Election</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
    </AdminLayout>
  );
};

export default CreateElectionPage;
