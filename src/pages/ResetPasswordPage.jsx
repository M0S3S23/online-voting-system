// src/pages/ResetPasswordPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthAPI } from "../services/auth";
import './ResetPasswordPage.css';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      await AuthAPI.forgotPassword(email);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'No account found with this email.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="reset-container">
        <div className="reset-success">
          <h2>Check Your Inbox</h2>
          <p>
            A password reset link has been sent to <strong>{email}</strong>.
          </p>
          <p>Please check your email and follow the instructions.</p>
          <Link to="/login" className="btn-back">
            ← Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-container">
      <form onSubmit={handleSubmit} className="reset-form">
        <h2>Forgot Password?</h2>
        <p>Enter your email to receive a reset link.</p>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        <Link to="/login" className="link-back">
          ← Back to Login
        </Link>
      </form>
    </div>
  );
}