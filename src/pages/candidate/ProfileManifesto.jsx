import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Image, Form, Spinner, Alert } from "react-bootstrap";
import { PencilSquare, Person } from "react-bootstrap-icons";
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

const ProfileManifesto = () => {
    const [candidateData, setCandidateData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Authentication token not found. Please log in.");
                    setLoading(false);
                    return;
                }

                // New backend endpoint to fetch candidate profile data
                const response = await fetch("http://localhost:3000/api/candidates/profile", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch profile data.");
                }

                const result = await response.json();
                setCandidateData(result);
            } catch (err) {
                setError("Failed to load profile data. Please try again.");
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <Alert variant="danger" className="w-50 text-center">
                    {error}
                </Alert>
            </div>
        );
    }

    if (!candidateData) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <Alert variant="info" className="w-50 text-center">
                    No candidate profile found.
                </Alert>
            </div>
        );
    }

    // Since our schema only has firstName, lastName, email, manifesto, and poster,
    // we'll remove phone, address, and bio from the display.
    const { firstName, lastName, email, manifesto, poster } = candidateData;

    return (
        <div className="d-flex" style={{ minHeight: "100vh", background: "#f4f6fa" }}>
            <Sidebar activeLink="profile-manifesto" />
            <div className="flex-grow-1 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="mb-0">Profile & Manifesto</h2>
                        <p className="text-muted">Manage your public profile and campaign manifesto</p>
                    </div>
                </div>

                <Row className="g-4 mb-4">
                    <Col md={4}>
                        <Card style={{ boxShadow: theme.cardShadow }}>
                            <Card.Body className="d-flex flex-column align-items-center text-center">
                                {poster ? (
                                    <Image
                                        src={poster}
                                        roundedCircle
                                        fluid
                                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                    />
                                ) : (
                                    <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center" style={{ width: "150px", height: "150px" }}>
                                        <Person size={75} color="#fff" />
                                    </div>
                                )}
                                <h4 className="mt-3 mb-1">{firstName} {lastName}</h4>
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
                                            <Form.Control plaintext readOnly defaultValue={email} />
                                        </Col>
                                    </Form.Group>
                                </Form>
                                <Button variant="primary" className="mt-3">
                                    <PencilSquare className="me-2" />
                                    Update Profile
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="g-4">
                    <Col md={12}>
                        <Card style={{ boxShadow: theme.cardShadow }}>
                            <Card.Body>
                                <Card.Title>My Manifesto</Card.Title>
                                <hr />
                                <p style={{ whiteSpace: "pre-line" }}>{manifesto || "No manifesto provided."}</p>
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