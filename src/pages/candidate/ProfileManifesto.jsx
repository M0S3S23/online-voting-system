import React, { useState } from "react";
import { Row, Col, Card, Button, Image, Form } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import Sidebar from "../../components/Sidebar";

// Define a consistent color theme
const theme = {
    sidebarBg: "#212529",
    sidebarText: "#f8f9fa",
    primary: "#0d6efd",
    accent: "#6610f2",
    success: "#198754",
    danger: "#dc3545",
    cardBg: "#ffffff",
    cardShadow: "0 0.5rem 1rem rgba(0,0,0,0.05)",
    navbarBg: "#f8f9fa",
    headerBg: "#e9ecef",
    progressComplete: "#198754",
    pending: "#ffc107",
};

// Mock data
const mockData = {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+260-971-123456",
    address: "123 University Drive, Lusaka, Zambia",
    bio: "A passionate and dedicated student leader with a vision for positive change. I am committed to improving campus life and fostering a more inclusive community for everyone.",
    manifesto: "My manifesto is built on three pillars: Transparency, Innovation, and Inclusivity. I pledge to make student council activities more accessible, introduce a digital suggestion box for students, and create more opportunities for student clubs and organizations. Together, we can build a better future for our campus.",
    photoUrl: "https://placehold.co/200",
};

const ProfileManifesto = () => {
    const [candidateData, setCandidateData] = useState(mockData);

    const handleEdit = (field, value) => {
        setCandidateData(prevData => ({ ...prevData, [field]: value }));
    };

    return (
        <div className="d-flex" style={{ minHeight: "100vh", background: "#f4f6fa" }}>
            {/* Sidebar */}
            <Sidebar activeLink="profile-manifesto" />

            {/* Main Content */}
            <div className="flex-grow-1 p-4">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="mb-0">Profile & Manifesto</h2>
                        <p className="text-muted">Manage your public profile and campaign manifesto</p>
                    </div>
                </div>

                {/* Profile and Contact Information */}
                <Row className="g-4 mb-4">
                    <Col md={4}>
                        <Card style={{ boxShadow: theme.cardShadow }}>
                            <Card.Body className="d-flex flex-column align-items-center text-center">
                                <Image
                                    src={candidateData.photoUrl}
                                    roundedCircle
                                    fluid
                                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                />
                                <h4 className="mt-3 mb-1">{candidateData.name}</h4>
                                <p className="text-muted">Student Council Candidate</p>
                                <Button variant="outline-primary" size="sm" className="mt-2">
                                    <PencilSquare className="me-2" />
                                    Edit Photo
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card style={{ boxShadow: theme.cardShadow }}>
                            <Card.Body>
                                <Card.Title>Contact Information</Card.Title>
                                <hr />
                                <Form>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3">Email</Form.Label>
                                        <Col sm="9">
                                            <Form.Control plaintext readOnly defaultValue={candidateData.email} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3">Phone</Form.Label>
                                        <Col sm="9">
                                            <Form.Control plaintext readOnly defaultValue={candidateData.phone} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3">Address</Form.Label>
                                        <Col sm="9">
                                            <Form.Control plaintext readOnly defaultValue={candidateData.address} />
                                        </Col>
                                    </Form.Group>
                                </Form>
                                <Button variant="primary" className="mt-3">
                                    <PencilSquare className="me-2" />
                                    Update Contact Info
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Bio and Manifesto */}
                <Row className="g-4">
                    <Col md={12}>
                        <Card style={{ boxShadow: theme.cardShadow }}>
                            <Card.Body>
                                <Card.Title>About Me</Card.Title>
                                <hr />
                                <p>{candidateData.bio}</p>
                                <Card.Title className="mt-4">My Manifesto</Card.Title>
                                <hr />
                                <p style={{ whiteSpace: "pre-line" }}>{candidateData.manifesto}</p>
                                <Button variant="primary" className="mt-3">
                                    <PencilSquare className="me-2" />
                                    Edit Manifesto
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ProfileManifesto;