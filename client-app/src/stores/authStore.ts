import { makeAutoObservable } from "mobx";
import axiosInstance from "../services/axiosConfig"; // Your axios instance with interceptors
import { loginApi } from "../services/authApi";

class AuthStore {
  user: { username: string } | null = null;
  token: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Computed property to check if the user is authenticated
  get isAuthenticated() {
    return this.token !== null;
  }

  async login(username: string, password: string) {
    try {
      const response = await loginApi(username, password);
      const { token, user } = response;
      this.user = user;
      this.token = token;
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  async loadUserFromToken() {
    const token = localStorage.getItem("token");
    if (token) {
      this.token = token;
      try {
        const response = await axiosInstance.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
        });
        this.user = response.data;
      } catch (error) {
        console.error("Failed to load user from token:", error);
        this.user = null;
      }
    }
  }

  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem("token");
  }
}

const authStore = new AuthStore();
export default authStore;
