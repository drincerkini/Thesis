import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        {
          username,
          password,
        }
      );
      const { token } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Fetch the current user
      fetchCurrentUser(token);
    } catch (err) {
      console.error("Login error", err);
    }
  };

  const fetchCurrentUser = async (token: string) => {
    try {
      const response = await axios.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Current user:", response.data); // Handle/display the current user
    } catch (err) {
      console.error("Failed to fetch current user", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

export default Register;
