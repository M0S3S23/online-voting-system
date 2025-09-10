import React from "react";
import { Container } from "react-bootstrap";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { useTheme } from "../../contexts/ThemeContext"; // ✅ correct import

const AdminLayout = ({ children }) => {
  const { darkMode, toggleTheme } = useTheme(); // ✅ works now

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: darkMode ? "#181828" : "#f8f9fa",
        transition: "all 0.3s ease",
      }}
    >
      {/* Sidebar */}
      <div style={{ width: "250px" }}>
        <AdminSidebar darkMode={darkMode} />
      </div>

      {/* Main Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AdminNavbar darkMode={darkMode} toggleTheme={toggleTheme} />

        <Container
          fluid
          className="p-4"
          style={{
            flex: 1,
            color: darkMode ? "#f8f9fa" : "#212529",
            background: darkMode ? "#1e1e2f" : "#ffffff",
            transition: "all 0.3s ease",
          }}
        >
          {typeof children === "function" ? children(darkMode) : children}
        </Container>
      </div>
    </div>
  );
};

export default AdminLayout;
