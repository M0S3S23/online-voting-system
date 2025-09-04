// src/components/Sidebar.jsx

import React from "react";
import { Nav, Button } from "react-bootstrap";
import { HouseDoor, FileEarmarkCheck, Person, Wallet, InfoCircle, BarChartLine, Bell, Gear, BoxArrowRight } from "react-bootstrap-icons";

// Define a consistent color theme (or import it from a central file)
const theme = {
    sidebarBg: "#212529",
    sidebarText: "#f8f9fa",
    primary: "#0d6efd",
};

// Sidebar component that takes 'activeLink' as a prop
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
                    href="/candidate/dashboard"
                    style={{ color: activeLink === "dashboard" ? theme.primary : theme.sidebarText, fontWeight: activeLink === "dashboard" ? 'bold' : 'normal' }}
                >
                    <HouseDoor className="me-2" color={theme.primary} /> Dashboard
                </Nav.Link>
                <Nav.Link
                    href="/candidate/application-status"
                    style={{ color: activeLink === "application-status" ? theme.primary : theme.sidebarText, fontWeight: activeLink === "application-status" ? 'bold' : 'normal' }}
                >
                    <FileEarmarkCheck className="me-2" color={theme.primary} /> Application Status
                </Nav.Link>
                <Nav.Link
                    href="/candidate/profile-manifesto"
                    style={{ color: activeLink === "profile-manifesto" ? theme.primary : theme.sidebarText, fontWeight: activeLink === "profile-manifesto" ? 'bold' : 'normal' }}
                >
                    <Person className="me-2" color={theme.primary} /> Profile & Manifesto
                </Nav.Link>
                <Nav.Link
                    href="/candidate/election-details"
                    style={{ color: activeLink === "election-details" ? theme.primary : theme.sidebarText, fontWeight: activeLink === "election-details" ? 'bold' : 'normal' }}
                >
                    <InfoCircle className="me-2" color={theme.primary} /> Election Details
                </Nav.Link>
                <Nav.Link
                    href="/candidate/voting-statistics"
                    style={{ color: activeLink === "voting-statistics" ? theme.primary : theme.sidebarText, fontWeight: activeLink === "voting-statistics" ? 'bold' : 'normal' }}
                >
                    <BarChartLine className="me-2" color={theme.primary} /> Voting Statistics
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;