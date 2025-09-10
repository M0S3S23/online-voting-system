import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import AppHeader from '../components/AppHeader';

const CandidateLayout = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const activeLink = pathSegments[pathSegments.length - 1]; // Gets the last segment (e.g., "dashboard")

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f7fb' }}>
            <Sidebar activeLink={activeLink} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <AppHeader />
                <Container fluid className="p-4">
                    <Outlet /> {/* This is where the nested route's content will be rendered */}
                </Container>
            </div>
        </div>
    );
};

export default CandidateLayout;