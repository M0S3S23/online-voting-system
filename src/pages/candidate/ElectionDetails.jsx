import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Nav, Button, ProgressBar, ListGroup, Spinner, Alert } from "react-bootstrap";
import { Person, ClipboardCheck, FileEarmarkCheck, InfoCircle, Gear, BoxArrowRight, HouseDoor, Speedometer, CalendarEvent, ClockHistory } from "react-bootstrap-icons";
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

const ElectionDetails = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchElectionDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Authentication token not found. Please log in.");
                    setLoading(false);
                    return;
                }

                const response = await fetch("/api/elections/details", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError("Failed to fetch election data. Please try again later.");
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchElectionDetails();
    }, []);

    const getStatusVariant = (status) => {
        switch (status.toLowerCase()) {
            case "completed":
            case "ongoing":
            case "active":
                return "success";
            case "upcoming":
                return "info";
            case "cancelled":
                return "danger";
            default:
                return "secondary";
        }
    };

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

    // Since the API response format is different, we need to adapt the rendering logic
    // The previous mock data structure is a placeholder, so we'll render based on the new backend data.
    // The `ElectionDetails` component expects `election` and `timeline` objects.
    // We will assume the backend provides the `election` object with all the details.
    // The `timeline` part of the mock data is not provided by the backend, so we will use a placeholder or remove it.
    
    // We'll update the render logic to use the fetched 'data' object.
    // Assuming the backend response directly contains all required fields.
    const { name, status, startDate, endDate, timeRemaining, registeredVoters, votesCast, turnout, timeline } = data.election;

    return (
        <div className="d-flex" style={{ minHeight: "100vh", background: "#f4f6fa" }}>
            {/* Sidebar */}
            <Sidebar activeLink="election-details" />

            {/* Main Content */}
            <div className="flex-grow-1 p-4">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="mb-0">Election Details</h2>
                        <p className="text-muted">Information for the {name}</p>
                    </div>
                </div>

                {/* Key Metrics Cards */}
                <Row className="g-4 mb-4">
                    <Col md={4}>
                        <Card style={{ boxShadow: theme.cardShadow }}>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <Card.Title>Voter Turnout</Card.Title>
                                        <Card.Text as="div">
                                            <h3 className={`text-${getStatusVariant("completed")}`}>{turnout}%</h3>
                                        </Card.Text>
                                    </div>
                                    <Speedometer size={36} className={`text-${getStatusVariant("completed")}`} />
                                </div>
                                <ProgressBar
                                    now={turnout}
                                    variant={getStatusVariant("completed")}
                                    className="mt-3"
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card style={{ boxShadow: theme.cardShadow }}>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <Card.Title>Votes Cast</Card.Title>
                                        <Card.Text as="div">
                                            <h3 style={{ color: theme.primary }}>{votesCast}</h3>
                                        </Card.Text>
                                    </div>
                                    <ClipboardCheck size={36} color={theme.primary} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card style={{ boxShadow: theme.cardShadow }}>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <Card.Title>Time Remaining</Card.Title>
                                        <Card.Text as="div">
                                            <h3 style={{ color: theme.danger }}>{timeRemaining}</h3>
                                        </Card.Text>
                                    </div>
                                    <ClockHistory size={36} color={theme.danger} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Timeline and Summary */}
                <Row className="g-4">
                    <Col md={6}>
                        <Card style={{ boxShadow: theme.cardShadow }}>
                            <Card.Header style={{ background: theme.headerBg }}>
                                <h5 className="mb-0">Election Timeline</h5>
                            </Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    {timeline.map((item, index) => (
                                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <CalendarEvent className="me-2" color={theme.primary} />
                                                {item.title}
                                            </div>
                                            <div className={`badge bg-${getStatusVariant(item.status)}`}>
                                                {item.status}
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card style={{ boxShadow: theme.cardShadow }}>
                            <Card.Header style={{ background: theme.headerBg }}>
                                <h5 className="mb-0">Summary</h5>
                            </Card.Header>
                            <Card.Body>
                                <p><strong>Election Name:</strong> {name}</p>
                                <p><strong>Status:</strong> <span className={`badge bg-${getStatusVariant(status)}`}>{status}</span></p>
                                <p><strong>Voting Period:</strong> {startDate} to {endDate}</p>
                                <p><strong>Total Registered Voters:</strong> {registeredVoters}</p>
                                <p><strong>Total Votes Cast:</strong> {votesCast}</p>
                                <Button variant="primary" className="mt-3">
                                    <InfoCircle className="me-2" />
                                    View Full Election Rules
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ElectionDetails;