import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { BoxArrowRight, Sun, Moon } from "react-bootstrap-icons";
import { useUser } from "../../contexts/UserContext"; // adjust path

// Light and dark theme objects
const lightTheme = {
  primary: "#0d6efd",
  accent: "#6610f2",
  navbarBg: "linear-gradient(90deg, #f8f9fa, #e9ecef)",
  text: "#212529",
  cardShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const darkTheme = {
  primary: "#66b2ff",
  accent: "#bb86fc",
  navbarBg: "linear-gradient(90deg, #212529, #343a40)",
  text: "#f8f9fa",
  cardShadow: "0 4px 12px rgba(0,0,0,0.5)",
};

const AdminNavbar = ({ darkMode, toggleTheme }) => {
  const { user, logoutUser } = useUser();

  const theme = darkMode ? darkTheme : lightTheme;

  const initials =
    user?.firstName?.[0]?.toUpperCase() +
    (user?.lastName?.[0]?.toUpperCase() || "");

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/signin";
  };

  return (
    <Navbar
      sticky="top"
      style={{
        background: theme.navbarBg,
        boxShadow: theme.cardShadow,
        padding: "0.7rem 1rem",
      }}
    >
      <Container fluid>
        {/* Brand */}
        <Navbar.Brand
          style={{
            color: theme.primary,
            fontWeight: "600",
            fontSize: "1.25rem",
            letterSpacing: "0.5px",
          }}
        >
          Admin Dashboard
        </Navbar.Brand>

        {/* Right section */}
        <div className="ms-auto d-flex align-items-center">
          {/* Theme Toggle */}
          <Button
            variant="outline-secondary"
            size="sm"
            style={{
              marginRight: "1rem",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              color: theme.text,
            }}
            onClick={toggleTheme} // call toggle from AdminLayout
          >
            {darkMode ? <Sun /> : <Moon />}
          </Button>

          {/* User Avatar */}
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: theme.accent,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600",
              marginRight: "0.75rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            {initials || "A"}
          </div>

          {/* Welcome Text */}
          <span
            className="me-3"
            style={{ color: theme.text, fontSize: "0.95rem", fontWeight: "500" }}
          >
            Welcome, {user?.firstName || "Admin"}
          </span>

          {/* Logout */}
          <Button
            variant={darkMode ? "outline-light" : "danger"}
            size="sm"
            style={{
              borderRadius: "20px",
              fontWeight: "500",
              padding: "0.4rem 0.9rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              boxShadow: "0 3px 8px rgba(220,53,69,0.3)",
              transition: "all 0.2s ease",
            }}
            onClick={handleLogout}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <BoxArrowRight size={18} /> Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
