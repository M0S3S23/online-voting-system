import React, { useEffect, useState } from "react";
import { Container, Nav, Dropdown, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AppHeader = ({ active = "Dashboard" }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ name: "User" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/api/users/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          const name =
            [data.firstName, data.lastName].filter(Boolean).join(" ") ||
            data.email ||
            "User";
          setUser({ name });
        } else {
          setUser({ name: "User" });
        }
      } catch (e) {
        setUser({ name: "User" });
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const onLogout = async () => {
    try {
      await fetch("http://localhost:3000/reg/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {}
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <Container>
        <span className="navbar-brand fw-bold">VoteSecure</span>
        <div className="d-flex align-items-center">
          <Nav className="me-4">
            <Nav.Link
              as={Link}
              to={"/vdashboard"}
              className={`text-white ${active === "Dashboard" ? "active" : ""}`}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/elections"}
              className={`text-white ${active === "Elections" ? "active" : ""}`}
            >
              Elections
            </Nav.Link>
          </Nav>

          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-light" id="user-dropdown">
              {loading ? <Spinner animation="border" size="sm" /> : user.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </nav>
  );
};

export default AppHeader;
