import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, ProgressBar } from "react-bootstrap";
import { Person, ClipboardCheck, FileEarmarkCheck, GraphUp, Bell, ArrowRight, Wallet, InfoCircle, Gear, BoxArrowRight, CalendarEvent, BarChartLine, ClockHistory, HouseDoor, Speedometer } from "react-bootstrap-icons";
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
};

// Mock data to simulate real-time updates and API calls
const mockData = {
  candidate: {
    name: "John Smith",
    photo: "https://via.placeholder.com/150",
    electionName: "Student Council Election 2024",
    totalVotes: 847,
    votePercentage: 31.5,
    rank: 1,
    electionsParticipating: 3,
    profileCompletion: 75,
    applicationStatus: "Approved",
    paymentStatus: "Confirmed",
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
  notifications: [
    { id: 1, text: "New vote received!", type: "success", time: "5 min ago" },
    { id: 2, text: "Voting period extended by 24 hours.", type: "info", time: "1 hr ago" },
    { id: 3, text: "You have 5 pending profile updates.", type: "warning", time: "2 hr ago" },
    { id: 4, text: "Campaign post from another candidate.", type: "secondary", time: "3 hr ago" },
    { id: 5, text: "New voters registered for the election.", type: "info", time: "4 hr ago" },
  ],
  events: [
    { id: 1, name: "Candidate Debate", date: "Oct 25, 2025" },
    { id: 2, name: "Campaign Rally", date: "Oct 28, 2025" },
    { id: 3, name: "Results Announcement", date: "Nov 1, 2025" },
  ],
};

const CandidateDashboard = () => {
  const [data, setData] = useState(mockData);

  useEffect(() => {
    // This effect can be used to simulate real-time data fetching
    const interval = setInterval(() => {
      // Simulate new votes coming in
      setData((prevData) => ({
        ...prevData,
        candidate: {
          ...prevData.candidate,
          totalVotes: prevData.candidate.totalVotes + Math.floor(Math.random() * 5),
          votePercentage: (prevData.candidate.totalVotes + Math.floor(Math.random() * 5)) / 2500 * 100
        },
        notifications: [
          { id: Math.random(), text: "New vote received!", type: "success", time: "Just now" },
          ...prevData.notifications
        ].slice(0, 5) // Keep only the latest 5 notifications
      }));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#f4f6fa" }}>
      {/* Sidebar */}
            <Sidebar activeLink="dashboard" />

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        {/* Top Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-0">Welcome, {data.candidate.name}</h2>
            <p className="text-muted">Dashboard for {data.candidate.electionName}</p>
          </div>
          <div className="d-flex align-items-center">
            <div className="me-3 text-end">
              <p className="mb-0 text-muted">Profile Completion</p>
              <h5 className="mb-0" style={{ color: theme.primary }}>{data.candidate.profileCompletion}%</h5>
            </div>
            <ProgressBar
              now={data.candidate.profileCompletion}
              variant="success"
              style={{ width: "100px", height: "10px" }}
            />
          </div>
        </div>

        {/* Status and Metrics Cards */}
        <Row className="g-4 mb-4">
          <Col md={3}>
            <Card style={{ background: theme.cardBg, boxShadow: theme.cardShadow }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title>Total Votes</Card.Title>
                    <Card.Text as="div"><h3 style={{ color: theme.primary }}>{data.candidate.totalVotes}</h3></Card.Text>
                  </div>
                  <GraphUp size={36} color={theme.primary} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ background: theme.cardBg, boxShadow: theme.cardShadow }}>
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
          <Col md={3}>
            <Card style={{ background: theme.cardBg, boxShadow: theme.cardShadow }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title>Current Rank</Card.Title>
                    {/* Fixed: Use as="div" to avoid invalid HTML nesting */}
                    <Card.Text as="div">
                      <h3 style={{ color: theme.success }}>#{data.candidate.rank}</h3>
                    </Card.Text>
                  </div>
                  <Person size={36} color={theme.success} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={{ background: theme.cardBg, boxShadow: theme.cardShadow }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title>Elections</Card.Title>
                    {/* Fixed: Use as="div" to avoid invalid HTML nesting */}
                    <Card.Text as="div">
                      <h3 style={{ color: theme.danger }}>{data.candidate.electionsParticipating}</h3>
                    </Card.Text>
                  </div>
                  <ClipboardCheck size={36} color={theme.danger} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Main Content Area: Charts and Notifications */}
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
                <h5 className="mb-0">Real-time Notifications</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <ul className="list-group list-group-flush">
                  {data.notifications.map((notif) => (
                    <li key={notif.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        <Bell className="me-2" color={theme.primary} />
                        {notif.text}
                      </span>
                      <small className="text-muted">{notif.time}</small>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Competition and Events */}
        <Row className="g-4 mt-4">
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
          <Col md={4}>
            <Card style={{ boxShadow: theme.cardShadow }}>
              <Card.Header style={{ background: theme.headerBg }}>
                <h5 className="mb-0">Quick Actions</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Button variant="outline-primary"><Person className="me-2" /> Update Profile</Button>
                  <Button variant="outline-primary"><GraphUp className="me-2" /> View Detailed Analytics</Button>
                  <Button variant="outline-primary"><FileEarmarkCheck className="me-2" /> Check Application Status</Button>
                  <Button variant="outline-primary"><ArrowRight className="me-2" /> Start New Application</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ boxShadow: theme.cardShadow }}>
              <Card.Header style={{ background: theme.headerBg }}>
                <h5 className="mb-0">Upcoming Events</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <ul className="list-group list-group-flush">
                  {data.events.map((event) => (
                    <li key={event.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <span><CalendarEvent className="me-2" color={theme.primary} />{event.name}</span>
                      <small className="text-muted">{event.date}</small>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CandidateDashboard;