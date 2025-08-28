import React from "react";
import { Nav } from "react-bootstrap";
import { House, People, Gear } from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  const links = [
    { path: "/admin", label: "Dashboard", icon: <House /> },
    { path: "/admin/users", label: "Users", icon: <People /> },
    { path: "/admin/elections", label: "Elections", icon: <People /> },
    { path: "/admin/settings", label: "Settings", icon: <Gear /> },
  ];

  return (
    <div className="admin-sidebar bg-light vh-100 p-3 shadow-sm">
      <h4 className="mb-4">Admin Panel</h4>
      <Nav className="flex-column">
        {links.map((link) => (
          <Nav.Item key={link.path}>
            <Nav.Link
              as={Link}
              to={link.path}
              active={location.pathname === link.path}
              className="d-flex align-items-center mb-2"
            >
              {link.icon}
              <span className="ms-2">{link.label}</span>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default AdminSidebar;
