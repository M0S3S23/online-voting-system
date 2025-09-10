export const NotificationAPI = {
  getNotifications: async () => {
    const response = await fetch("http://localhost:3000/api/notifications", {
      credentials: "include" // since you're using sessions
    });
    if (!response.ok) throw new Error("Failed to fetch notifications");
    return response.json();
  },

  addNotification: async (notif) => {
    const response = await fetch("http://localhost:3000/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(notif),
    });
    if (!response.ok) throw new Error("Failed to add notification");
    return response.json();
  },

  clearAll: async () => {
    const response = await fetch("http://localhost:3000/api/notifications", {
      method: "DELETE",
      credentials: "include"
    });
    return response.json();
  }
};
