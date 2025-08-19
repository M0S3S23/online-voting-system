import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  ShieldCheck,
  Lock,
  Facebook,
  Twitter,
  Linkedin
} from 'react-bootstrap-icons';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row>
          <Col md={4}>
            <h4 className="mb-4">VoteSecure</h4>
            <p>The most trusted digital voting platform for organizations and governments.</p>
            <div className="d-flex gap-3">
              {/* Updated social icons using react-bootstrap-icons */}
              <a href="#facebook" className="text-white"><Facebook size={20} /></a>
              <a href="#twitter" className="text-white"><Twitter size={20} /></a>
              <a href="#linkedin" className="text-white"><Linkedin size={20} /></a>
            </div>
          </Col>
          <Col md={2}>
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#home" className="text-white text-decoration-none">Home</a></li>
              <li className="mb-2"><a href="#about" className="text-white text-decoration-none">About</a></li>
              <li className="mb-2"><a href="#elections" className="text-white text-decoration-none">Elections</a></li>
              <li className="mb-2"><a href="#contact" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className="mb-3">Security</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#privacy" className="text-white text-decoration-none">Privacy Policy</a></li>
              <li className="mb-2"><a href="#terms" className="text-white text-decoration-none">Terms of Service</a></li>
              <li className="mb-2"><a href="#security" className="text-white text-decoration-none">Security Overview</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <ShieldCheck size={24} className="text-success" />
              <span>SSL Secured Connection</span>
            </div>
            <div className="d-flex align-items-center gap-2 mb-3">
              <Lock size={24} className="text-success" />
              <span>256-bit Encryption</span>
            </div>
            <p className="small text-muted mt-4">
              © {new Date().getFullYear()} VoteSecure. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;