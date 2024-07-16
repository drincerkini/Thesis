import axios from "axios";

const API_BASE_URL = "https://localhost:7098/api/auth";

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    localStorage.setItem("token", response.data.token); // Store the token
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
export const register = async (user: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, user);
    localStorage.setItem("token", response.data.token); // Store the token
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_BASE_URL}/logout`);
    localStorage.removeItem("token"); // Clear the token
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
