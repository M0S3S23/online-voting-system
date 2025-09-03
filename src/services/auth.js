// src/services/auth.js
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

export const AuthAPI = {
  forgotPassword: async (email) => {
    const res = await fetch(`${API_BASE}/reg/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'No account found with this email.');
    }

    return res.json();
  },
};