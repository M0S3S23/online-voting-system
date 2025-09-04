// src/api/NotificationAPI.js
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

export const NotificationAPI = {
  getNotifications: async () => {
    const res = await fetch(`${API_BASE}/api/notifications`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!res.ok) throw new Error('Failed to load notifications');
    return res.json();
  }
};