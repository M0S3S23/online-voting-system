// src/components/notifications/NotificationCard.jsx
import { useState } from 'react';

const typeStyles = {
  info: { dot: '#007bff', bg: '#f8f9fa' },
  success: { dot: '#28a745', bg: '#f8fff9' },
  warning: { dot: '#ffc107', bg: '#fff9e6' },
  error: { dot: '#dc3545', bg: '#fff5f5' }
};

export default function NotificationCard({ notification, onUpdate }) {
  const { id, title, message, type = 'info', timestamp, read } = notification;
  const [isRead, setIsRead] = useState(read);
  const styles = typeStyles[type] || typeStyles.info;

  const formatDate = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const handleMarkAsRead = () => {
    if (isRead) return;
    setIsRead(true);
    onUpdate(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <div
      className={`notification-card ${isRead ? 'read' : 'unread'}`}
      style={{ borderLeft: `4px solid ${styles.dot}`, backgroundColor: styles.bg }}
      onClick={handleMarkAsRead}
    >
      <div className="notification-content">
        <h5 className={`title ${isRead ? 'read' : ''}`}>{title}</h5>
        <p className="message">{message}</p>
        <small className="timestamp">{formatDate(timestamp)}</small>
      </div>
    </div>
  );
}