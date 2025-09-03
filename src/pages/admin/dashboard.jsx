import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { PeopleFill, PlayFill, ClockFill, CheckCircleFill } from "react-bootstrap-icons";
import AdminLayout from "../../components/admin/AdminLayout";

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend);

const cardStyles = {
  border: "none",
  borderRadius: "1rem",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const gradients = {
  dark: {
    users: "linear-gradient(135deg, #0d6efd, #3b82f6)",
    active: "linear-gradient(135deg, #198754, #20c997)",
    upcoming: "linear-gradient(135deg, #ffc107, #ffcd39)",
    completed: "linear-gradient(135deg, #6610f2, #6f42c1)",
  },
  light: {
    users: "#e7f1ff",
    active: "#d4f8e8",
    upcoming: "#fff5d1",
    completed: "#efe0ff",
  },
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

  const StatCard = ({ title, value, icon: Icon, bg, darkMode }) => (
    <Card
      style={{
        ...cardStyles,
        background: bg,
        color: darkMode ? "#fff" : "#212529",
      }}
      className="shadow-sm"
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <Card.Body className="d-flex align-items-center justify-content-between">
        <div>
          <h6 className="mb-1 text-uppercase" style={{ fontSize: "0.8rem", opacity: 0.85 }}>
            {title}
          </h6>
          <h2 className="fw-bold mb-0">{loading ? "..." : value}</h2>
        </div>
        <Icon size={36} opacity={0.85} />
      </Card.Body>
    </Card>
  );

  return (
    <AdminLayout>
      {(darkMode) => {
        const textColor = darkMode ? "#f8f9fa" : "#212529";

        // Pie chart data for election status
        const pieData = {
          labels: ["Active", "Upcoming", "Completed"],
          datasets: [
            {
              data: [stats.active, stats.upcoming, stats.completed],
              backgroundColor: ["#198754", "#ffc107", "#6610f2"],
            },
          ],
        };

        // Bar chart data for total users vs elections
        const barData = {
          labels: [ "Active Elections", "Upcoming Elections", "Completed Elections"],
          datasets: [
            {
              label: "Count",
              data: [ stats.active, stats.upcoming, stats.completed],
              backgroundColor: ["#0d6efd", "#198754", "#ffc107"],
              borderRadius: 6,
            },
          ],
        };

        return (
          <div>
            <div className="mb-4">
              <h2 className="fw-bold">Dashboard Overview</h2>
              <p style={{ opacity: 0.7, marginBottom: 0 }}>
                Quick glance at system statistics and election activity
              </p>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <Row className="g-4 mb-4">
              <Col md={3}>
                <StatCard
                  title="Total Users"
                  value={stats.totalUsers}
                  icon={PeopleFill}
                  bg={darkMode ? gradients.dark.users : gradients.light.users}
                  darkMode={darkMode}
                />
              </Col>
              <Col md={3}>
                <StatCard
                  title="Active Elections"
                  value={stats.active}
                  icon={PlayFill}
                  bg={darkMode ? gradients.dark.active : gradients.light.active}
                  darkMode={darkMode}
                />
              </Col>
              <Col md={3}>
                <StatCard
                  title="Upcoming Elections"
                  value={stats.upcoming}
                  icon={ClockFill}
                  bg={darkMode ? gradients.dark.upcoming : gradients.light.upcoming}
                  darkMode={darkMode}
                />
              </Col>
              <Col md={3}>
                <StatCard
                  title="Completed Elections"
                  value={stats.completed}
                  icon={CheckCircleFill}
                  bg={darkMode ? gradients.dark.completed : gradients.light.completed}
                  darkMode={darkMode}
                />
              </Col>
            </Row>

            <Row className="g-4">
              <Col md={6}>
  <Card
    style={{
      background: darkMode ? "#27293d" : "#fff",
      color: textColor,
      borderRadius: "1rem",
      height: "350px", // Card height
    }}
  >
    <Card.Body className="d-flex flex-column">
      <h5 className="mb-3">Election Status Distribution</h5>
      <div style={{ flex: 1 }}> {/* Make chart fill remaining space */}
        <Pie
          data={pieData}
          options={{
            responsive: true,
            maintainAspectRatio: false, // allow filling container
            plugins: { legend: { position: "bottom" } },
          }}
        />
      </div>
    </Card.Body>
  </Card>
</Col>

              <Col md={6}>
                <Card style={{ background: darkMode ? "#27293d" : "#fff", color: textColor, borderRadius: "1rem" }}>
                  <Card.Body>
                    <h5 className="mb-3">Elections</h5>
                    <Bar
                      data={barData}
                      options={{
                        responsive: true,
                        plugins: { legend: { display: false } },
                        scales: { y: { beginAtZero: true } },
                      }}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        );
      }}
    </AdminLayout>
  );
};

export default AdminDashboard;
