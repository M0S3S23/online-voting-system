// src/api/NotificationAPI.js
export const NotificationAPI = {
  getNotifications: async () => {
    const response = await fetch("http://localhost:5000/api/notifications");
    if (!response.ok) {
      throw new Error("Failed to fetch notifications");
    }
    return response.json();
  },

  addNotification: async (notification) => {
    const response = await fetch("http://localhost:5000/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notification)
    });
    if (!response.ok) {
      throw new Error("Failed to add notification");
    }
    return response.json();
  }
};
