import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  username: string;
  role: string;
  // Add other fields that your API returns
}

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null); // Use the User type for state

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get<User>(
            "http://localhost:5001/api/auth/me",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setCurrentUser(response.data); // Set current user state
        } catch (err) {
          console.error("Error fetching user", err);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {currentUser ? (
        <h1>Welcome, {currentUser.username}</h1> // TypeScript now knows `username` exists
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default Dashboard;
