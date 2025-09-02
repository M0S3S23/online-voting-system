import React from "react";
import { Button, Card, Row, Col, Table, Badge } from "react-bootstrap";
import AdminLayout from "../../components/admin/AdminLayout";

const CreateElectionPage = () => {
  // Dummy data for now – replace with API data
  const elections = [
    { id: 1, title: "Student Council 2025", status: "upcoming", startDate: "2025-09-10", endDate: "2025-09-15" },
    { id: 2, title: "Faculty Senate", status: "ongoing", startDate: "2025-08-25", endDate: "2025-09-05" },
  ];

  // Map status to themed badge colors
  const statusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "info"; // light blue
      case "ongoing":
        return "primary"; // solid blue
      case "completed":
        return "secondary"; // gray
      default:
        return "secondary";
    }
  };

  return (
    <AdminLayout>
      {/* Header Row */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="text-primary fw-bold">Elections Management</h2>
          <p className="text-muted">View, create, and manage elections.</p>
        </Col>
        <Col className="text-end">
          <Button variant="primary" size="lg">
            + Create New Election
          </Button>
        </Col>
      </Row>

      {/* Active and Upcoming Elections */}
      <Card className="mb-4 shadow-sm border-0">
        <Card.Header className="bg-primary text-white fw-bold">
          Active & Upcoming Elections
        </Card.Header>
        <Card.Body className="bg-white">
          <Table hover responsive bordered className="mb-0 align-middle">
            <thead>
              <tr className="table-primary">
                <th>Title</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {elections.map((election) => (
                <tr key={election.id}>
                  <td>{election.title}</td>
                  <td>
                    <Badge
                      bg={statusColor(election.status)} // ✅ correct for v2
                      className="px-3 py-2 text-capitalize"
                    >
                      {election.status}
                    </Badge>
                  </td>
                  <td>{election.startDate}</td>
                  <td>{election.endDate}</td>
                  <td className="text-center">
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

      {/* Completed Elections */}
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-primary text-white fw-bold">
          Completed Elections
        </Card.Header>
        <Card.Body className="bg-white">
          <p className="text-muted">No completed elections yet.</p>
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default CreateElectionPage;
