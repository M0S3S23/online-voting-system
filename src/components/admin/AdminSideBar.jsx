import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { House, People, Gear, ClipboardData } from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";

// Light theme
const lightTheme = {
  bg: "#f8f9fa",
  text: "#212529",
  activeBg: "linear-gradient(90deg, #0d6efd, #6610f2)",
  activeText: "#fff",
  hoverBg: "#e9ecef",
  shadow: "0 4px 12px rgba(0,0,0,0.08)",
};

// Dark theme
const darkTheme = {
  bg: "#212529",
  text: "#f8f9fa",
  activeBg: "linear-gradient(90deg, #66b2ff, #bb86fc)",
  activeText: "#fff",
  hoverBg: "#343a40",
  shadow: "0 4px 12px rgba(0,0,0,0.5)",
};

const AdminSidebar = ({ darkMode = true }) => {
  const location = useLocation();
  const theme = darkMode ? darkTheme : lightTheme;

  const links = [
    { path: "/admin", label: "Dashboard", icon: <House size={18} /> },
    { path: "/admin/users", label: "Users", icon: <People size={18} /> },
    { path: "/admin/elections", label: "Elections", icon: <ClipboardData size={18} /> },
    { path: "/admin/settings", label: "Settings", icon: <Gear size={18} /> },
  ];

  return (
    <div
      className="admin-sidebar d-flex flex-column vh-100 p-3"
      style={{
        background: theme.bg,
        color: theme.text,
        boxShadow: theme.shadow,
        transition: "all 0.3s ease",
        minWidth: "220px",
      }}
    >
      <h4
        className="mb-4"
        style={{ fontWeight: "600", color: theme.text, letterSpacing: "0.5px" }}
      >
        Admin Panel
      </h4>

      <Nav className="flex-column">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Nav.Item key={link.path}>
              <Nav.Link
                as={Link}
                to={link.path}
                active={isActive}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.6rem 0.9rem",
                  borderRadius: "12px",
                  fontWeight: "500",
                  color: isActive ? theme.activeText : theme.text,
                  background: isActive ? theme.activeBg : "transparent",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = theme.hoverBg;
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "transparent";
                }}
              >
                {link.icon}
                <span>{link.label}</span>
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
    </div>
  );
};

export default AdminSidebar;
