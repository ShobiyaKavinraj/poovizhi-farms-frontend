import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./loginStyle.css";

const LoginForm = ({ onClose, switchForm, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Extract redirect query param, default to home
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("redirect") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/auth/login", {
        email: email.toLowerCase(),
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // save user info

      // 🔹 Immediately update parent/header state without refresh
      if (onLoginSuccess) {
        onLoginSuccess(response.data.user);
      }

      if (onClose) onClose();
      navigate(redirectPath, { replace: true });

    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container fade-in">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="extra-links">
        <p>
          <span className="link" onClick={() => switchForm?.("forgot")}>
            Forgot Password?
          </span>
        </p>
        <p>
          Don’t have an account?{" "}
          <span className="link" onClick={() => switchForm?.("signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import "./loginStyle.css";

// const LoginForm = ({ onClose, switchForm }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Extract redirect query param, default to home
//   const searchParams = new URLSearchParams(location.search);
//   const redirectPath = searchParams.get("redirect") || "/";

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError("Please enter both email and password.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.post("/api/auth/login", {
//         email: email.toLowerCase(),
//         password,
//       });

//       // Save token
//       localStorage.setItem("token", response.data.token);

//       // Notify app that authentication status changed
//       window.dispatchEvent(new Event("authChanged"));

//       // Close modal if applicable
//       if (onClose) onClose();

//       // Redirect user
//       navigate(redirectPath, { replace: true });

//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container fade-in">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           autoFocus
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         {error && <p className="error">{error}</p>}

//         <button type="submit" className="login-button" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>

//       <div className="extra-links">
//         <p>
//           <span className="link" onClick={() => switchForm?.("forgot")}>
//             Forgot Password?
//           </span>
//         </p>
//         <p>
//           Don’t have an account?{" "}
//           <span className="link" onClick={() => switchForm?.("signup")}>
//             Sign Up
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import "./loginStyle.css";

// const LoginForm = ({ onClose, switchForm }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Extract redirect query param, default to home
//   const searchParams = new URLSearchParams(location.search);
//   const redirectPath = searchParams.get("redirect") || "/";

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError("Please enter both email and password.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.post("/api/auth/login", {
//         email: email.toLowerCase(),
//         password,
//       });

//       localStorage.setItem("token", response.data.token);

//       if (onClose) onClose();
//       navigate(redirectPath, { replace: true }); // Go to checkout or wherever needed

//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container fade-in">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           autoFocus
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         {error && <p className="error">{error}</p>}

//         <button type="submit" className="login-button" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>

//       <div className="extra-links">
//         <p>
//           <span className="link" onClick={() => switchForm?.("forgot")}>
//             Forgot Password?
//           </span>
//         </p>
//         <p>
//           Don’t have an account?{" "}
//           <span className="link" onClick={() => switchForm?.("signup")}>
//             Sign Up
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

/*import React, { Component } from "react";
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
    let { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: "Please enter both email and password." });
      return;
    }

    email = email.toLowerCase(); // Normalize email

    this.setState({ loading: true });

    try {
      console.log("Attempting login with:", { email, password });

      const response = await axios.post("/api/auth/login", { email, password }); // use proxy

      console.log("Login response:", response.data);

      localStorage.setItem("token", response.data.token);

      if (this.props.onLoginSuccess) this.props.onLoginSuccess();
      if (this.props.onClose) this.props.onClose();

    } catch (err) {
      console.error("Login error:", err.response?.data || err.message, err.response?.status);

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
      </div>
    );
  }
}

export default LoginForm;*/
