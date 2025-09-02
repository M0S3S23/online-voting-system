import React, { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    schoolName: "",
    defaultElectionDuration: 7, // days
    maxCandidatesPerElection: 5,
    sessionTimeout: 30, // minutes
    enableEmailNotifications: true,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch existing settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("http://localhost:3000/admin/settings", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch settings");

        const data = await res.json();
        setSettings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save settings
  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:3000/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to save settings");
      }

      setSuccess("Settings updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AdminLayout>
      {(darkMode) => {
        const bgColor = darkMode ? "#1e1e2f" : "#f8f9fa";
        const textColor = darkMode ? "#f8f9fa" : "#212529";
        const cardBg = darkMode ? "#27293d" : "#ffffff";

        return (
          <div>
            <h2 className="mb-4" style={{ color: textColor }}>
              System Settings
            </h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Card style={{ background: cardBg, color: textColor, transition: "all 0.3s ease" }}>
              <Card.Body>
                <Form onSubmit={handleSave}>
                  {/* School Info */}
                  <h5 className="mb-3">School Information</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>School Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="schoolName"
                      value={settings.schoolName}
                      onChange={handleChange}
                      placeholder="Enter school name"
                    />
                  </Form.Group>

                  {/* Election Settings */}
                  <h5 className="mb-3 mt-4">Election Settings</h5>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Default Election Duration (days)</Form.Label>
                        <Form.Control
                          type="number"
                          name="defaultElectionDuration"
                          value={settings.defaultElectionDuration}
                          onChange={handleChange}
                          min={1}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Max Candidates per Election</Form.Label>
                        <Form.Control
                          type="number"
                          name="maxCandidatesPerElection"
                          value={settings.maxCandidatesPerElection}
                          onChange={handleChange}
                          min={1}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Security Settings */}
                  <h5 className="mb-3 mt-4">Security</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Session Timeout (minutes)</Form.Label>
                    <Form.Control
                      type="number"
                      name="sessionTimeout"
                      value={settings.sessionTimeout}
                      onChange={handleChange}
                      min={5}
                    />
                  </Form.Group>

                  {/* Notifications */}
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Enable Email Notifications"
                      name="enableEmailNotifications"
                      checked={settings.enableEmailNotifications}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Button variant={darkMode ? "primary" : "success"} type="submit">
                    Save Settings
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        );
      }}
    </AdminLayout>
  );
};

export default AdminSettingsPage;
