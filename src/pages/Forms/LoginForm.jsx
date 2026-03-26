import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./loginStyle.css";

const API = import.meta.env.VITE_API_BASE;

const LoginForm = ({ onClose, switchForm, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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
      const response = await axios.post(`${API}/api/auth/login`, {
        email: email.toLowerCase(),
        password,
      });

      // save token
      localStorage.setItem("token", response.data.token);

      // save user info
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // update header/login state
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
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />

        <input
          type="password"
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
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import "./loginStyle.css";

// const LoginForm = ({ onClose, switchForm, onLoginSuccess }) => {
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
//       const response = await axios.post ("https://poovizhi-farms-backend.onrender.com/api/auth/login", {
//         email: email.toLowerCase(),
//         password,
//       });

//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.user)); // save user info

//       // 🔹 Immediately update parent/header state without refresh
//       if (onLoginSuccess) {
//         onLoginSuccess(response.data.user);
//       }

//       if (onClose) onClose();
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

