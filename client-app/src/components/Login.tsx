import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../stores/authStore"; // Import authStore
import { AxiosError } from "axios"; // Import AxiosError type
import Spinner from "./Spinner"; // Import your reusable Spinner component

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Track the loading state
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError("Both username and password are required.");
      return;
    }

    setLoading(true); // Start the loading spinner

    try {
      // Introduce a 1-second delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await authStore.login(username, password); // Use the authStore to login
      navigate("/dashboard"); // Navigate to dashboard on successful login
      setError(null); // Clear error message on successful login
    } catch (error) {
      console.error("Login failed:", error);

      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Invalid username or password.";
        setError(errorMessage); // Set error message from API
      } else {
        setError("An unexpected error occurred."); // Show a general error message
      }
    } finally {
      setLoading(false); // Stop the spinner after the login process finishes
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading ? ( // Conditionally render the spinner when loading is true
        <Spinner /> // Show Spinner when loading
      ) : (
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// Wrap the component with observer, then export it
const ObservedLogin = observer(Login);

export default ObservedLogin;
