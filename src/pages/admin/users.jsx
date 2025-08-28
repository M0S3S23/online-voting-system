import React, { useEffect, useState } from "react";
import { Container, Card, Table, Button, Alert } from "react-bootstrap";
import { Trash, PencilSquare } from "react-bootstrap-icons";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Fetch all users from backend
  useEffect(() => {
    fetch("http://localhost:3000/admin/users/all", {
      method: "GET",
      credentials: "include", // send session cookie
    })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || "Failed to fetch users");
        }
        return res.json();
      })
      .then((data) => setUsers(data.users))
      .catch((err) => setError(err.message));
  }, []);

  // Toggle admin status
  const toggleAdmin = (userId) => {
    fetch(`http://localhost:3000/admin/users/${userId}/toggle-admin`, {
      method: "PATCH",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || "Failed to update user");
        }
        return res.json();
      })
      .then((data) => {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, isAdmin: !u.isAdmin } : u))
        );
      })
      .catch((err) => alert(err.message));
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Users Management</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card className="shadow-sm">
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Student ID</th>
                <th>Admin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.studentId || "-"}</td>
                    <td>{user.isAdmin ? "Yes" : "No"}</td>
                    <td>
                      <Button
                        size="sm"
                        variant={user.isAdmin ? "warning" : "success"}
                        className="me-2"
                        onClick={() => toggleAdmin(user._id)}
                      >
                        {user.isAdmin ? "Revoke Admin" : "Make Admin"}
                      </Button>
                      <Button size="sm" variant="danger">
                        <Trash /> Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminUsersPage;
