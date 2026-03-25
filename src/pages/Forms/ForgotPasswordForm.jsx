import React, { Component } from "react";
import axios from "axios";
import './loginStyle.css';

class ForgotPasswordForm extends Component {
  state = {
    email: "",
    message: "",
    error: ""
  };

  handleChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = this.state;

    if (!email.trim()) {
      this.setState({ error: "Please enter your email", message: "" });
      return;
    }

    try {
      const response = await axios.post("https://poovizhi-farms-backend.onrender.com/api/auth/forgot-password", { email });
      console.log("Reset request sent:", response.data);

      this.setState({
        message: response.data.message || "Reset link sent successfully!",
        error: "",
        email: ""
      });

      setTimeout(() => {
        this.props.switchForm("login");
      }, 3000);

    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      this.setState({
        error: err.response?.data?.message || "Failed to send reset link",
        message: ""
      });
    }
  };

  render() {
    const { email, message, error } = this.state;

    return (
      <div className="login-container">
        <h2>Forgot Password</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={this.handleChange}
          />
          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}
          <button type="submit" className="login-button">Send Reset Link</button>
        </form>

        <div className="extra-links">
          <p>
            Remembered your password?{" "}
            <span className="link" onClick={() => this.props.switchForm("login")}>
              Back to Login
            </span>
          </p>
        </div>

        <button className="close-button" onClick={() => this.props.switchForm("login")}>✖</button>
      </div>
    );
  }
}

export default ForgotPasswordForm;
