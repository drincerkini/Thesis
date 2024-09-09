import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../stores/authStore"; // Import authStore

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authStore.login(username, password); // Use the authStore to login
      navigate("/dashboard"); // Navigate to dashboard on successful login
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally show an error message
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

// Wrap the component with observer, then export it
const ObservedLogin = observer(Login);

export default ObservedLogin;
