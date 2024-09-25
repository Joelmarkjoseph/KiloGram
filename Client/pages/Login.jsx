import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css";

function Login() {
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Log in user via API
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uname: uname,
        password: password,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Login successful:", result);
      localStorage.setItem("token", result.token); // Store the token if needed
      navigate("/dashboard"); // Redirect to the dashboard
    } else {
      console.error("Login failed:", result.message);
      alert(result.message); // Show error message to the user
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to KiloGram</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={uname}
            onChange={(e) => setUname(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input type="submit" value="Login" />
        </form>
        <div className="forgot-password">
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
