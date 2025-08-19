import React from "react";
import { Navbar, Nav, Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand to="/" as={Link}>
                    <span className="fw-bold fs-5 text-primary">VoteSecure</span> {/* Added text-primary for blue color */}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end"> {/* Use justify-content-end to push content to the right */}
                    <Nav>
                        <Button as={Link} variant="outline-primary" to="/signin" className="me-2">Sign In</Button> {/* Outline blue button with margin-right */}
    
                        {/* Outline blue button with margin-right */}
                        <Button as={Link} variant="primary" to="/register" className="me-2">
                          Register to Vote
                        </Button> {/* Solid blue button */}
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
  );
}

export default Header;