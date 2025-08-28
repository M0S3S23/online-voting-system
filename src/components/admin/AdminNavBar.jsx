import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";
import { useUser } from "../../contexts/UserContext"; // adjust path

const theme = {
  primary: "#0d6efd",
  accent: "#6610f2",
  navbarBg: "#f8f9fa",
  cardShadow: "0 0.5rem 1rem rgba(0,0,0,0.05)",
  warning: "#ffc107",
};

const AdminNavbar = () => {
  const { user, logoutUser } = useUser();

  return (
    <Navbar
      style={{
        background: theme.navbarBg,
        boxShadow: theme.cardShadow,
      }}
      className="px-3"
    >
      <Container fluid>
        <Navbar.Brand style={{ color: theme.primary }}>Admin Dashboard</Navbar.Brand>
        <div className="ms-auto d-flex align-items-center">
          <span className="me-3" style={{ color: theme.warning }}>
            Welcome, {user?.firstName || "Admin"}
          </span>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => {
              logoutUser();
              window.location.href = "/signin"; // redirect to login
            }}
          >
            <BoxArrowRight className="me-1" /> Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
