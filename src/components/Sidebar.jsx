import React from "react";
import { Nav } from "react-bootstrap";
import { HouseDoor, FileEarmarkCheck, Person, InfoCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom"; 

// Define a consistent color theme
const theme = {
    sidebarBg: "#212529",
    sidebarText: "#f8f9fa",
    primary: "#0d6efd",
};

const Sidebar = ({ activeLink }) => {
    return (
        <div
            className="p-3 d-flex flex-column"
            style={{
                width: "250px",
                background: theme.sidebarBg,
                color: theme.sidebarText,
                minHeight: "100vh",
            }}
        >
            <h4 className="mb-4" style={{ color: theme.primary }}>Candidate Portal</h4>
            <Nav className="flex-column flex-grow-1">
                <Nav.Link
                    as={Link}
                    to="/candidate/dashboard"
                    style={{ color: activeLink === "dashboard" ? theme.primary : theme.sidebarText, fontWeight: activeLink === "dashboard" ? 'bold' : 'normal' }}
                >
                    <HouseDoor className="me-2" color={theme.primary} /> Dashboard
                </Nav.Link>
                <Nav.Link
                    as={Link}
                    to="/candidate/application-status"
                    style={{ color: activeLink === "application-status" ? theme.primary : theme.sidebarText, fontWeight: activeLink === "application-status" ? 'bold' : 'normal' }}
                >
                    <FileEarmarkCheck className="me-2" color={theme.primary} /> Application Status
                </Nav.Link>
                <Nav.Link
                    as={Link}
                    to="/candidate/profile-manifesto"
                    style={{ color: activeLink === "profile-manifesto" ? theme.primary : theme.sidebarText, fontWeight: activeLink === "profile-manifesto" ? 'bold' : 'normal' }}
                >
                    <Person className="me-2" color={theme.primary} /> Profile & Manifesto
                </Nav.Link>
                <Nav.Link
                    as={Link}
                    to="/candidate/election-details"
                    style={{ color: activeLink === "election-details" ? theme.primary : theme.sidebarText, fontWeight: activeLink === "election-details" ? 'bold' : 'normal' }}
                >
                    <InfoCircle className="me-2" color={theme.primary} /> Election Details
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;