import React, { useState } from "react";
import { Container, Table, Badge, Form, Row, Col, Card } from "react-bootstrap";

const ElectionResults = () => {
  // Mock final results
  const finalResults = [
    {
      position: "President",
      registeredVoters: 700,
      candidates: [
        { name: "Alice", votes: 320, profilePic: "https://via.placeholder.com/40" },
        { name: "Bob", votes: 280, profilePic: "https://via.placeholder.com/40" },
      ],
    },
    {
      position: "Secretary",
      registeredVoters: 500,
      candidates: [
        { name: "Charlie", votes: 190, profilePic: "https://via.placeholder.com/40" },
        { name: "Diana", votes: 210, profilePic: "https://via.placeholder.com/40" },
      ],
    },
  ];

  // Search + sorting states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "votes", direction: "desc" });

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sort function
  const sortCandidates = (candidates) => {
    return [...candidates].sort((a, b) => {
      if (sortConfig.key === "percentage") {
        const total = candidates.reduce((sum, c) => sum + c.votes, 0);
        const aPerc = (a.votes / total) * 100;
        const bPerc = (b.votes / total) * 100;
        return sortConfig.direction === "asc" ? aPerc - bPerc : bPerc - aPerc;
      }
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Final Election Results</h2>

      {/* 🔍 Search bar */}
      <Form.Control
        type="text"
        placeholder="Search candidate..."
        className="mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {finalResults.map((pos, index) => {
        const totalVotes = pos.candidates.reduce((a, b) => a + b.votes, 0);
        const turnout = ((totalVotes / pos.registeredVoters) * 100).toFixed(1);

        // Identify winner + runner-up
        const sortedByVotes = [...pos.candidates].sort((a, b) => b.votes - a.votes);
        const winner = sortedByVotes[0];
        const runnerUp = sortedByVotes[1];
        const voteMargin = winner.votes - runnerUp.votes;

        // Apply search filter
        const filteredCandidates = pos.candidates.filter((c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Apply sorting
        const sortedCandidates = sortCandidates(filteredCandidates);

        return (
          <Card key={index} className="mb-5 shadow-sm">
            <Card.Body>
              <Row className="mb-3">
                <Col>
                  <h4>{pos.position}</h4>
                  <p className="text-muted">
                    Registered Voters: <b>{pos.registeredVoters}</b> | Total Votes: <b>{totalVotes}</b> | Turnout: <b>{turnout}%</b>
                  </p>
                  <p>
                    <Badge bg="info">
                      Vote Margin: {voteMargin} votes between {winner.name} & {runnerUp.name}
                    </Badge>
                  </p>
                </Col>
              </Row>

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                      Candidate {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => handleSort("votes")} style={{ cursor: "pointer" }}>
                      Votes {sortConfig.key === "votes" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => handleSort("percentage")} style={{ cursor: "pointer" }}>
                      Percentage {sortConfig.key === "percentage" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedCandidates.map((c, i) => {
                    const percentage = ((c.votes / totalVotes) * 100).toFixed(1);
                    return (
                      <tr key={i} className={c.name === winner.name ? "table-success" : ""}>
                        <td>
                          <img
                            src={c.profilePic}
                            alt={c.name}
                            className="rounded-circle me-2"
                            width="40"
                            height="40"
                          />
                          {c.name}
                        </td>
                        <td>{c.votes}</td>
                        <td>{percentage}%</td>
                        <td>
                          {c.name === winner.name ? (
                            <Badge bg="success">Winner 🏆</Badge>
                          ) : (
                            <Badge bg="secondary">—</Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        );
      })}
    </Container>
  );
};

export default ElectionResults;
