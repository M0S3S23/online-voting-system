import React, { useState } from "react";
import { Container, Row, Col, Card, Nav, Button, ProgressBar, ListGroup } from "react-bootstrap";
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

// Mock data for the election details
const mockData = {
    election: {
        name: "Student Council Election 2024",
        status: "Ongoing",
        startDate: "October 1, 2025",
        endDate: "October 31, 2025",
        timeRemaining: "7 Days, 12 Hours",
        registeredVoters: 1250,
        votesCast: 847,
        turnout: 67.8, // percentage
    },
    timeline: [
        { title: "Candidate Registration Opens", date: "September 1, 2025", status: "completed" },
        { title: "Candidate Vetting Period", date: "September 5, 2025", status: "completed" },
        { title: "Campaigning Period", date: "September 15, 2025", status: "completed" },
        { title: "Online Voting Begins", date: "October 1, 2025", status: "active" },
        { title: "Online Voting Ends", date: "October 31, 2025", status: "upcoming" },
        { title: "Results Announcement", date: "November 2, 2025", status: "upcoming" },
    ],
};

const ElectionDetails = () => {
    const [data] = useState(mockData);

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
                        <p className="text-muted">Information for the {data.election.name}</p>
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
                                            <h3 className={`text-${getStatusVariant("completed")}`}>{data.election.turnout}%</h3>
                                        </Card.Text>
                                    </div>
                                    <Speedometer size={36} className={`text-${getStatusVariant("completed")}`} />
                                </div>
                                <ProgressBar
                                    now={data.election.turnout}
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
                                            <h3 style={{ color: theme.primary }}>{data.election.votesCast}</h3>
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
                                            <h3 style={{ color: theme.danger }}>{data.election.timeRemaining}</h3>
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
                                    {data.timeline.map((item, index) => (
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
                                <p><strong>Election Name:</strong> {data.election.name}</p>
                                <p><strong>Status:</strong> <span className={`badge bg-${getStatusVariant(data.election.status)}`}>{data.election.status}</span></p>
                                <p><strong>Voting Period:</strong> {data.election.startDate} to {data.election.endDate}</p>
                                <p><strong>Total Registered Voters:</strong> {data.election.registeredVoters}</p>
                                <p><strong>Total Votes Cast:</strong> {data.election.votesCast}</p>
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