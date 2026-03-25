import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './loginStyle.css';

function ResetPasswordForm() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      setMessage("");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setMessage("");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setMessage("");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`https://poovizhi-farms-backend.onrender.com/api/auth/reset-password/${token}`, {
        password
      });

      setMessage(response.data.message || "Password reset successful!");
      setError("");
      setLoading(false);

      // Redirect to login
      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (err) {
      setLoading(false);
      console.error(err);
      setError(err.response?.data?.message || "Failed to reset password.");
      setMessage("");
    }
  };

  return (
    <div className="login-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
