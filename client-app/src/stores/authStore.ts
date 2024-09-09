import { makeAutoObservable } from "mobx";
import { loginApi } from "../services/authApi"; // Import the login API function

class AuthStore {
  user: { username: string; role: string } | null = null;
  token: string | null = localStorage.getItem("token") || null;
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
    if (this.token) {
      this.isAuthenticated = true;
    }
  }

  async login(username: string, password: string) {
    try {
      const { token, user } = await loginApi(username, password); // Call login API
      this.token = token;
      this.user = user;
      this.isAuthenticated = true;
      localStorage.setItem("token", token); // Store the token in localStorage
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  logout() {
    this.token = null;
    this.user = null;
    this.isAuthenticated = false;
    localStorage.removeItem("token"); // Remove token from localStorage
  }
}

const authStore = new AuthStore();
export default authStore;
