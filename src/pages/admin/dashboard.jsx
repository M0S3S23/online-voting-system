import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";
import AdminLayout from "../../components/admin/AdminLayout"; // wraps Navbar + Sidebar

const theme = {
  primary: "#0d6efd",
  accent: "#6610f2",
  cardBg: "#ffffff",
  cardShadow: "0 0.5rem 1rem rgba(0,0,0,0.05)",
  tableHeaderBg: "#0d6efd",
  tableHeaderText: "#fff",
};

const AdminDashboard = () => {
  return (
    <AdminLayout adminName="Admin">
      <Container fluid className="mt-4">
        <Row className="g-4">
          <Col md={4}>
            <Card style={{ background: theme.cardBg, boxShadow: theme.cardShadow }}>
              <Card.Body>
                <h5 style={{ color: theme.primary }}>Total Users</h5>
                <h3 style={{ color: theme.accent }}>1,240</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ background: theme.cardBg, boxShadow: theme.cardShadow }}>
              <Card.Body>
                <h5 style={{ color: theme.primary }}>Active Elections</h5>
                <h3 style={{ color: theme.accent }}>3</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ background: theme.cardBg, boxShadow: theme.cardShadow }}>
              <Card.Body>
                <h5 style={{ color: theme.primary }}>Pending Approvals</h5>
                <h3 style={{ color: theme.accent }}>15</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Example Table Section */}
        <Card className="mt-4" style={{ background: theme.cardBg, boxShadow: theme.cardShadow }}>
          <Card.Header style={{ background: theme.tableHeaderBg, color: theme.tableHeaderText }}>
            Recent Registrations
          </Card.Header>
          <Card.Body>
            <table className="table table-striped">
              <thead>
                <tr style={{ background: theme.tableHeaderBg }}>
                  <th style={{ color: theme.tableHeaderText }}>Name</th>
                  <th style={{ color: theme.tableHeaderText }}>Email</th>
                  <th style={{ color: theme.tableHeaderText }}>Student ID</th>
                  <th style={{ color: theme.tableHeaderText }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jane Doe</td>
                  <td>jane@example.com</td>
                  <td>20230123</td>
                  <td style={{ color: theme.primary }}>Approved</td>
                </tr>
                <tr>
                  <td>John Smith</td>
                  <td>john@example.com</td>
                  <td>20231234</td>
                  <td style={{ color: theme.accent }}>Pending</td>
                </tr>
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Container>
    </AdminLayout>
  );
};

export default AdminDashboard;
