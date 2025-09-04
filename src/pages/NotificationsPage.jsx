// src/pages/NotificationsPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckAll, XCircle } from 'react-bootstrap-icons';
import NotificationCard from '../components/notifications/NotificationCard';
import { NotificationAPI } from '../api/NotificationAPI';
import './NotificationsPage.css';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await NotificationAPI.getNotifications();
        setNotifications(data);
      } catch (err) {
        console.error("Failed to load notifications:", err);
        setNotifications([
          {
            id: 1,
            title: "Welcome to the System",
            message: "You’ve successfully logged in. Explore your dashboard.",
            type: "info",
            timestamp: new Date().toISOString(),
            read: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const isEmpty = notifications.length === 0;

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h2>
          <Bell className="me-2" />
          Notifications
        </h2>

        {!isEmpty && (
          <div className="header-actions">
            <button onClick={markAllAsRead} className="btn-mark-read">
              <CheckAll /> Mark All Read
            </button>
            <button onClick={clearAll} className="btn-clear">
              <XCircle /> Clear All
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="loading">Loading notifications...</div>
      ) : isEmpty ? (
        <div className="empty-state">
          <Bell size={48} className="text-muted" />
          <h5>No notifications yet</h5>
          <p>You’re all caught up!</p>
        </div>
      ) : (
        <div className="notification-list">
          {notifications.map(notif => (
            <NotificationCard
              key={notif.id}
              notification={notif}
              onUpdate={setNotifications}
            />
          ))}
        </div>
      )}

      <Link to="/vdashboard" className="back-link">
        ← Back to Dashboard
      </Link>
    </div>
  );
}