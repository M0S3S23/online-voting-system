import React, { useState } from "react";
import { Container, Row, Col, Card, Nav, Button, ProgressBar, Table } from "react-bootstrap";
import { Person, ClipboardCheck, FileEarmarkCheck, Bell, Wallet, InfoCircle, Gear, BoxArrowRight, HouseDoor, Speedometer, BarChartLine } from "react-bootstrap-icons";
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

// Mock data to simulate fetching from an API
const mockData = {
    candidate: {
        name: "John Smith",
        applicationId: "APP-57890",
        electionName: "Student Council Election 2024",
        status: "Approved",
        submissionDate: "2024-09-01",
        approvalDate: "2024-09-10",
        rejectionReason: null,
        profileCompletion: 75,
        paymentStatus: "Confirmed",
    },
    steps: [
        { name: "Personal Information", status: "Completed", date: "2024-09-01" },
        { name: "Manifesto & Vision", status: "Completed", date: "2024-09-01" },
        { name: "Eligibility Documents", status: "Completed", date: "2024-09-02" },
        { name: "Payment Confirmation", status: "Confirmed", date: "2024-09-03" },
        { name: "Application Review", status: "Approved", date: "2024-09-10" },
    ],
    documents: [
        { name: "Student ID Card", status: "Approved", notes: "Clear and valid." },
        { name: "Proof of Residency", status: "Approved", notes: "Document matches university records." },
        { name: "Letter of Recommendation", status: "Pending", notes: "Awaiting review by the committee." },
    ],
};

const ApplicationStatus = () => {
    const [data] = useState(mockData);

    const getStatusVariant = (status) => {
        switch (status.toLowerCase()) {
            case "approved":
            case "completed":
            case "confirmed":
                return "success";
            case "pending":
                return "warning";
            case "rejected":
                return "danger";
            default:
                return "secondary";
        }
    };

    return (
        <div className="d-flex" style={{ minHeight: "100vh", background: "#f4f6fa" }}>
            {/* Sidebar */}
            <Sidebar activeLink="application-status" />

            {/* Main Content */}
            <div className="flex-grow-1 p-4">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="mb-0">Application Status</h2>
                        <p className="text-muted">Review the status of your election application</p>
                    </div>
                </div>

                {/* Status and Progress Cards */}
                <Row className="g-4 mb-4">
                    <Col md={4}>
                        <Card style={{ boxShadow: theme.cardShadow }}>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <Card.Title>Overall Status</Card.Title>
                                        {/* FIXED: Change Card.Text to as="div" to fix invalid HTML nesting */}
                                        <Card.Text as="div">
                                            <h3 className={`text-${getStatusVariant(data.candidate.status)}`}>
                                                {data.candidate.status}
                                            </h3>
                                        </Card.Text>
                                    </div>
                                    <ClipboardCheck size={36} className={`text-${getStatusVariant(data.candidate.status)}`} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card style={{ boxShadow: theme.cardShadow }}>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <Card.Title>Application ID</Card.Title>
                                        <Card.Text as="div">
                                            <h5 style={{ color: theme.primary }}>{data.candidate.applicationId}</h5>
                                        </Card.Text>
                                    </div>
                                    <InfoCircle size={36} color={theme.primary} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card style={{ boxShadow: theme.cardShadow }}>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <Card.Title>Profile Completion</Card.Title>
                                        <Card.Text as="div">
                                            <h5 style={{ color: theme.success }}>{data.candidate.profileCompletion}%</h5>
                                        </Card.Text>
                                    </div>
                                    <div style={{ width: "80px" }}>
                                        <ProgressBar now={data.candidate.profileCompletion} variant="success" />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Main Content: Application Steps and Documents */}
                <Row className="g-4">
                    {/* Application Steps */}
                    <Col md={6}>
                        <Card style={{ boxShadow: theme.cardShadow }}>
                            <Card.Header style={{ background: theme.headerBg }}>
                                <h5 className="mb-0">Application Steps</h5>
                            </Card.Header>
                            <Card.Body>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Step</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.steps.map((step, index) => (
                                            <tr key={index}>
                                                <td>{step.name}</td>
                                                <td>
                                                    <span className={`badge bg-${getStatusVariant(step.status)}`}>
                                                        {step.status}
                                                    </span>
                                                </td>
                                                <td>{step.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Documents Status */}
                    <Col md={6}>
                        <Card style={{ boxShadow: theme.cardShadow }}>
                            <Card.Header style={{ background: theme.headerBg }}>
                                <h5 className="mb-0">Document Status</h5>
                            </Card.Header>
                            <Card.Body>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Document</th>
                                            <th>Status</th>
                                            <th>Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.documents.map((doc, index) => (
                                            <tr key={index}>
                                                <td>{doc.name}</td>
                                                <td>
                                                    <span className={`badge bg-${getStatusVariant(doc.status)}`}>
                                                        {doc.status}
                                                    </span>
                                                </td>
                                                <td>{doc.notes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ApplicationStatus;