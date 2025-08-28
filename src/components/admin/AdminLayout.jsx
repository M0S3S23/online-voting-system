import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ children, adminName }) => {
  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      {/* Vertical Sidebar */}
      <div style={{ width: "250px" }}>
        <AdminSidebar />
      </div>

      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Navbar */}
        <AdminNavbar adminName={adminName} />

        {/* Page Content */}
        <Container fluid className="p-4" style={{ flex: 1 }}>
          {children}
        </Container>
      </div>
    </div>
  );
};

export default AdminLayout;
