import React, { Component } from "react";
import axios from "axios"; 
import './loginStyle.css';

class SignupForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    success: ""
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = this.state;

    if (!username || !email || !password || !confirmPassword) {
      this.setState({ error: "Please fill in all fields.", success: "" });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ error: "Passwords do not match.", success: "" });
      return;
    }

    try {
      const response = await axios.post("https://poovizhi-farms-backend.onrender.com/api/auth/signup", {
        name: username,
        email,
        password,
      });

      console.log("Signup successful:", response.data);

      // ✅ Save JWT token to localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // ✅ Notify parent (Header) that signup was successful
     if (this.props.onSignupSuccess) {
        this.props.onSignupSuccess();
      }
/*if (props.onSignupSuccess) {
  props.onSignupSuccess(); // It switches to login form
}*/

      // Clear form fields
      this.setState({
        error: "",
        success: "Account created successfully!",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      this.setState({
        error: err.response?.data?.message || "Signup failed. Try again.",
        success: ""
      });
    }
  };

  render() {
    const { username, email, password, confirmPassword, error, success } = this.state;

    return (
      <div className="login-container">
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={this.handleChange}
          />
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button type="submit" className="login-button">Create Account</button>
        </form>

        <div className="extra-links">
          <p>
            Already have an account?{" "}
            <span className="link" onClick={() => this.props.switchForm("login")}>
              Log in
            </span>
          </p>
        </div>

        <button className="close-button" onClick={this.props.onClose}>✖</button>
      </div>
    );
  }
}

export default SignupForm;
