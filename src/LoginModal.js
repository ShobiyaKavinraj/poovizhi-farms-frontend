import React, { Component } from "react";
import axios from "axios";
import './loginStyle.css';

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    loading: false
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: "" });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: "Please enter both email and password." });
      return;
    }

    this.setState({ loading: true });

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      if (this.props.onLoginSuccess) {
        this.props.onLoginSuccess(); // sets isLoggedIn in header
      }

      if (this.props.onClose) {
        this.props.onClose(); // closes the modal
      }

    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      this.setState({
        error: err.response?.data?.message || "Login failed. Please try again.",
        loading: false
      });
    }
  };

  render() {
    const { email, password, error, loading } = this.state;

    return (
      <div className="login-container fade-in">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
            autoFocus
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
          />
          {error && <p className="error">{error}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="extra-links">
          <p>
            <span className="link" onClick={() => this.props.switchForm?.("forgot")}>
              Forgot Password?
            </span>
          </p>
          <p>
            Don’t have an account?{" "}
            <span className="link" onClick={() => this.props.switchForm?.("signup")}>
              Sign Up
            </span>
          </p>
        </div>

        <div className="social-login">
          <button className="social-button google">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
            Login with Google
          </button>
          <button className="social-button facebook">
            <img src="https://img.icons8.com/ios-filled/16/ffffff/facebook--v1.png" alt="Facebook" />
            Login with Facebook
          </button>
        </div>
      </div>
    );
  }
}

export default LoginForm;
