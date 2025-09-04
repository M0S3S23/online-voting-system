import React, { useState } from "react";
import { Row, Col, Card, Nav, Button } from "react-bootstrap";
import { Person, ClipboardCheck, FileEarmarkCheck, GraphUp, Bell, ArrowRight, Wallet, InfoCircle, Gear, BoxArrowRight, HouseDoor, Speedometer, BarChartLine, ClockHistory, CalendarEvent } from "react-bootstrap-icons";
import { Line, Pie } from "react-chartjs-2";
import "chart.js/auto";
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

// Mock data to simulate real-time updates and API calls
const mockData = {
    candidate: {
        name: "John Smith",
        totalVotes: 847,
        votePercentage: 31.5,
        rank: 1,
    },
    election: {
        timeRemaining: "2 Days, 14 Hours",
        registeredVoters: 1250,
        votesCast: 847,
        turnout: 67.8,
    },
    voteTrends: {
        labels: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"],
        datasets: [
            {
                label: "Votes Received",
                data: [50, 80, 150, 165, 178, 250, 315],
                fill: true,
                backgroundColor: "rgba(13, 110, 253, 0.2)",
                borderColor: "#0d6efd",
                tension: 0.3,
            },
        ],
    },
    competition: {
        labels: ["You", "Bob Smith", "Carol Davis", "David Wilson", "Others"],
        datasets: [
            {
                data: [847, 750, 520, 480, 250],
                backgroundColor: ["#0d6efd", "#ffc107", "#fd7e14", "#20c997", "#adb5bd"],
                hoverOffset: 4,
            },
        ],
    },
};

const VotingStatistics = () => {
    const [data] = useState(mockData);

    // Reusable function to get status variant for badges/colors
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
            <Sidebar activeLink="voting-statistics" />

            {/* Main Content */}
            <div className="flex-grow-1 p-4">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="mb-0">Voting Statistics</h2>
                        <p className="text-muted">Analyze key voting trends and competition data</p>
                    </div>
                </div>

                {/* Key Metrics Cards */}
                <Row className="g-4 mb-4">
                    <Col md={4}>
                        <Card style={{ boxShadow: theme.cardShadow }}>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <Card.Title>Total Votes</Card.Title>
                                        <Card.Text as="div"><h3 style={{ color: theme.primary }}>{data.candidate.totalVotes}</h3></Card.Text>
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
                                        <Card.Title>Vote Percentage</Card.Title>
                                        <Card.Text as="div">
                                            <h3 style={{ color: theme.accent }}>{data.candidate.votePercentage}%</h3>
                                        </Card.Text>
                                    </div>
                                    <BarChartLine size={36} color={theme.accent} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card style={{ boxShadow: theme.cardShadow }}>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <Card.Title>Current Rank</Card.Title>
                                        <Card.Text as="div">
                                            <h3 style={{ color: theme.success }}>#{data.candidate.rank}</h3>
                                        </Card.Text>
                                    </div>
                                    <Person size={36} color={theme.success} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Charts Section */}
                <Row className="g-4">
                    <Col md={8}>
                        <Card style={{ boxShadow: theme.cardShadow }}>
                            <Card.Header style={{ background: theme.headerBg }}>
                                <h5 className="mb-0">Vote Trend Analysis</h5>
                                <p className="text-muted mb-0">Votes received over the last 7 hours</p>
                            </Card.Header>
                            <Card.Body>
                                <Line
                                    data={data.voteTrends}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: { display: false },
                                            title: { display: false },
                                        },
                                    }}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card style={{ boxShadow: theme.cardShadow }}>
                            <Card.Header style={{ background: theme.headerBg }}>
                                <h5 className="mb-0">Competition Overview</h5>
                            </Card.Header>
                            <Card.Body>
                                <Pie
                                    data={data.competition}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: { position: "bottom" },
                                        },
                                    }}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default VotingStatistics;