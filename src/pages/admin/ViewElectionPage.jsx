import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Col, Table, Badge, Spinner, Alert } from "react-bootstrap";
import AdminLayout from "../../components/admin/AdminLayout";

const ViewElectionPage = () => {
  const { id } = useParams();
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

const fetchElection = async () => {
  try {
    setLoading(true);
    const res = await fetch(`http://localhost:3000/api/elections/${id}`, {
      credentials: "include",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json(); // read body once

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch election");
    }

    console.log(data);
    setElection(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchElection();
  }, [id]);

  const statusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "info";
      case "ongoing":
        return "success";
      case "completed":
        return "secondary";
      default:
        return "secondary";
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!election) return <p>No election found.</p>;

  return (
    <AdminLayout>
      {(darkMode) => {
        const textColor = darkMode ? "#f8f9fa" : "#212529";
        const cardBg = darkMode ? "#27293d" : "#ffffff";
        const headerClass = darkMode ? "bg-dark text-white" : "bg-primary text-white";
        const tableHeader = darkMode ? "table-dark" : "table-light";

        return (
          <div>
            <h2 className="fw-bold mb-3" style={{ color: textColor }}>
              {election.title}
            </h2>
            <p style={{ color: textColor }}>{election.description}</p>

            <Card className="mb-4" style={{ background: cardBg, color: textColor }}>
              <Card.Header className={headerClass}>Election Info</Card.Header>
              <Card.Body>
                <Row className="mb-2">
                  <Col><strong>Status:</strong> 
                    <Badge bg={statusColor(election.status)} className="ms-2 text-capitalize">
                      {election.status}
                    </Badge>
                  </Col>
                </Row>
                <Row>
                  <Col><strong>Start:</strong> {election.startDate?.substring(0, 10)}</Col>
                  <Col><strong>End:</strong> {election.endDate?.substring(0, 10)}</Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Positions */}
            <Card className="mb-4" style={{ background: cardBg, color: textColor }}>
              <Card.Header className={headerClass}>Positions</Card.Header>
              <Card.Body>
                {election.positions?.length > 0 ? (
                  <Table bordered responsive>
                    <thead>
                      <tr className={tableHeader}>
                        <th>Position</th>
                        <th>Seats</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {election.positions.map((pos, i) => (
                        <tr key={i}>
                          <td>{pos.positionName}</td>
                          <td>{pos.seats}</td>
                          <td>{pos.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p>No positions added.</p>
                )}
              </Card.Body>
            </Card>

            {/* Candidates */}
            <Card className="mb-4" style={{ background: cardBg, color: textColor }}>
              <Card.Header className={headerClass}>Candidates</Card.Header>
              <Card.Body>
                {election.candidates?.length > 0 ? (
                  <Table bordered responsive>
                    <thead>
                      <tr className={tableHeader}>
                        <th>User</th>
                        <th>Party</th>
                        <th>Position</th>
                        <th>Approved</th>
                      </tr>
                    </thead>
                    <tbody>
                      {election.candidates.map((c, i) => (
                        <tr key={i}>
                          <td>{c.userId}</td> {/* better if populated */}
                          <td>{c.party}</td>
                          <td>{c.position}</td>
                          <td>
                            <Badge bg={c.approved ? "success" : "warning"}>
                              {c.approved ? "Approved" : "Pending"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p>No candidates yet.</p>
                )}
              </Card.Body>
            </Card>

            {/* Votes */}
            <Card style={{ background: cardBg, color: textColor }}>
              <Card.Header className={headerClass}>Votes</Card.Header>
              <Card.Body>
                {election.votes?.length > 0 ? (
                  <p><strong>Total Votes:</strong> {election.votes.length}</p>
                ) : (
                  <p>No votes recorded yet.</p>
                )}
              </Card.Body>
            </Card>
          </div>
        );
      }}
    </AdminLayout>
  );
};

export default ViewElectionPage;
