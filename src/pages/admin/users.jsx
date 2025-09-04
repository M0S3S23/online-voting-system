import React, { useEffect, useState } from "react";
import { Card, Table, Button, Alert } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Fetch all users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/admin/users/all", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || "Failed to fetch users");
        }

        const data = await res.json();
        setUsers(data); // array of users
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:3000/admin/users/delete/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to delete user");
      }
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      alert(err.message);
    }
  };

// Toggle admin status
const toggleAdmin = async (userId, isCurrentlyAdmin) => {
  try {
    const endpoint = isCurrentlyAdmin
      ? `http://localhost:3000/api/users/revoke-admin/${userId}`
      : `http://localhost:3000/api/users/make-admin/${userId}`;

    const res = await fetch(endpoint, {
      method: "PATCH",
      credentials: "include",
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "Failed to update user");
    }

    setUsers((prev) =>
      prev.map((u) =>
        u._id === userId ? { ...u, isAdmin: !u.isAdmin } : u
      )
    );
  } catch (err) {
    alert(err.message);
  }
};


  return (
    <AdminLayout>
      {(darkMode) => {
        const bgColor = darkMode ? "#1e1e2f" : "#f8f9fa";
        const textColor = darkMode ? "#f8f9fa" : "#212529";
        const cardBg = darkMode ? "#27293d" : "#ffffff";
        const tableVariant = darkMode ? "dark" : "light";

        return (
          <div>
            <h2 className="mb-4" style={{ color: textColor }}>
              Users Management
            </h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Card
              className="shadow-sm"
              style={{ background: cardBg, color: textColor, transition: "all 0.3s ease" }}
            >
              <Card.Body>
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  variant={tableVariant}
                  style={{ color: textColor }}
                >
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
                          <td>
                            {user.firstName} {user.lastName}
                          </td>
                          <td>{user.email}</td>
                          <td>{user.studentId || "-"}</td>
                          <td>{user.isAdmin ? "Yes" : "No"}</td>
                          <td>
                            <Button
                              size="sm"
                              variant={user.isAdmin ? "warning" : "success"}
                              className="me-2"
                              onClick={() => toggleAdmin(user._id, user.isAdmin)}
                            >
                              {user.isAdmin ? "Revoke Admin" : "Make Admin"}
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handleDelete(user._id)}
                            >
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
          </div>
        );
      }}
    </AdminLayout>
  );
};

export default AdminUsersPage;
