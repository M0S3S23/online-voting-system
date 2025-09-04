import React from "react";
import { Container, Row, Col, Card, Nav, Navbar, Button } from "react-bootstrap";
import { People, Gear, House, BoxArrowRight, ClipboardCheck } from "react-bootstrap-icons";

// Define a consistent color theme
const theme = {
    sidebarBg: "#212529",
    sidebarText: "#f8f9fa",
    primary: "#0d6efd",
    accent: "#6610f2",
    cardBg: "#ffffff",
    cardShadow: "0 0.5rem 1rem rgba(0,0,0,0.05)",
    navbarBg: "#f8f9fa",
    tableHeaderBg: "#0d6efd",
    tableHeaderText: "#fff",
};

const AdminDashboard = () => {
    return (
        <div className="d-flex" style={{ minHeight: "100vh", background: "#f4f6fa" }}>
            {/* Sidebar */}
            <div
                className="p-3"
                style={{
                    width: "250px",
                    background: theme.sidebarBg,
                    color: theme.sidebarText,
                }}
            >
                <h4 className="mb-4" style={{ color: theme.primary }}>Admin Panel</h4>
                <Nav className="flex-column">
                    <Nav.Link href="#" style={{ color: theme.sidebarText }}>
                        <House className="me-2" color={theme.primary} /> Dashboard
                    </Nav.Link>
                    <Nav.Link href="#" style={{ color: theme.sidebarText }}>
                        <People className="me-2" color={theme.primary} /> Users
                    </Nav.Link>
                    <Nav.Link href="#" style={{ color: theme.sidebarText }}>
                        <ClipboardCheck className="me-2" color={theme.primary} /> Elections
                    </Nav.Link>
                    <Nav.Link href="#" style={{ color: theme.sidebarText }}>
                        <Gear className="me-2" color={theme.primary} /> Settings
                    </Nav.Link>
                </Nav>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1">
                {/* Top Navbar */}
                <Navbar
                    style={{
                        background: theme.navbarBg,
                        boxShadow: theme.cardShadow,
                    }}
                    className="px-3"
                >
                    <Navbar.Brand style={{ color: theme.primary }}>Admin Dashboard</Navbar.Brand>
                    <div className="ms-auto d-flex align-items-center">
                        <span className="me-3" style={{ color: theme.accent }}>Welcome, Admin</span>
                        <Button variant="outline-danger" size="sm">
                            <BoxArrowRight className="me-1" /> Logout
                        </Button>
                    </div>
                </Navbar>

                {/* Dashboard Content */}
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
                        <Card.Header style={{ background: theme.primary, color: theme.tableHeaderText }}>
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
            </div>
        </div>
    );
};

export default AdminDashboard;
