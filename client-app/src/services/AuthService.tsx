import axios from "axios";

const API_BASE_URL = "https://localhost:7098/api/Auth"; // Replace with your actual API base URL

export interface RegisterDto {
  email: string;
  password: string;
}

export const register = async (userData: RegisterDto) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export interface LoginDto {
  email: string;
  password: string;
}

export const login = async (userData: LoginDto) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logout`);
    return response.data;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};

// Add other authentication-related functions as needed
