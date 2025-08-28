// components/form/SecurityNoticeCard.js
import React from "react";
import { Alert } from "react-bootstrap";
import { InfoCircle } from "react-bootstrap-icons";

const SecurityNoticeCard = () => (
  <Alert variant="info" className="mb-4">
    <div className="d-flex">
      <InfoCircle size={20} className="me-2 mt-1" />
      <div>
        <h6 className="mb-2">Security & Privacy Notice</h6>
        <ul className="small mb-0">
          <li>All personal information is encrypted</li>
          <li>Multi-factor authentication required for voting</li>
          <li>Voting records are anonymous</li>
          <li>Compliant with election security standards</li>
        </ul>
      </div>
    </div>
  </Alert>
);

export default SecurityNoticeCard;
