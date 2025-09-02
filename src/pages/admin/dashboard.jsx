import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { PeopleFill, PlayFill, ClockFill, CheckCircleFill } from "react-bootstrap-icons";
import AdminLayout from "../../components/admin/AdminLayout"; // wraps Navbar + Sidebar

const cardStyles = {
  border: "none",
  borderRadius: "1rem",
  color: "#fff",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const gradients = {
  users: "linear-gradient(135deg, #0d6efd, #3b82f6)",
  active: "linear-gradient(135deg, #198754, #20c997)",
  upcoming: "linear-gradient(135deg, #ffc107, #ffcd39)",
  completed: "linear-gradient(135deg, #6610f2, #6f42c1)",
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    active: 0,
    upcoming: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, activeRes, upcomingRes, completedRes] = await Promise.all([
          fetch("http://localhost:3000/admin/users/total", { credentials: "include" }),
          fetch("http://localhost:3000/api/elections/stats/active", { credentials: "include" }),
          fetch("http://localhost:3000/api/elections/stats/upcoming", { credentials: "include" }),
          fetch("http://localhost:3000/api/elections/stats/completed", { credentials: "include" }),
        ]);

        if (!usersRes.ok || !activeRes.ok || !upcomingRes.ok || !completedRes.ok) {
          throw new Error("Failed to fetch one or more stats");
        }

        const usersData = await usersRes.json();
        const activeData = await activeRes.json();
        const upcomingData = await upcomingRes.json();
        const completedData = await completedRes.json();

        setStats({
          totalUsers: usersData.totalUsers || 0,
          active: activeData.count || 0,
          upcoming: upcomingData.count || 0,
          completed: completedData.count || 0,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, bg }) => (
    <Card
      style={{ ...cardStyles, background: bg }}
      className="shadow-sm"
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <Card.Body className="d-flex align-items-center justify-content-between">
        <div>
          <h6 className="mb-1 text-uppercase" style={{ fontSize: "0.8rem", opacity: 0.9 }}>
            {title}
          </h6>
          <h2 className="fw-bold mb-0">{loading ? "..." : value}</h2>
        </div>
        <Icon size={36} opacity={0.8} />
      </Card.Body>
    </Card>
  );

  return (
    <AdminLayout adminName="Admin">
      <Container fluid className="mt-4">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Row className="g-4">
          <Col md={3}>
            <StatCard title="Total Users" value={stats.totalUsers} icon={PeopleFill} bg={gradients.users} />
          </Col>
          <Col md={3}>
            <StatCard title="Active Elections" value={stats.active} icon={PlayFill} bg={gradients.active} />
          </Col>
          <Col md={3}>
            <StatCard title="Upcoming Elections" value={stats.upcoming} icon={ClockFill} bg={gradients.upcoming} />
          </Col>
          <Col md={3}>
            <StatCard title="Completed Elections" value={stats.completed} icon={CheckCircleFill} bg={gradients.completed} />
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default AdminDashboard;
