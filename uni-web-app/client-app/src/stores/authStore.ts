import { makeAutoObservable, runInAction } from "mobx";
import axiosInstance from "../services/axiosConfig";
import { loginApi } from "../services/authApi";

class AuthStore {
  user: { username: string } | null = null;
  token: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isAuthenticated() {
    return this.token !== null;
  }

  async login(username: string, password: string) {
    try {
      const { token, user } = await loginApi(username, password);

      runInAction(() => {
        this.user = user;
        this.token = token;
      });

      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  async loadUserFromToken() {
    const token = localStorage.getItem("token");
    if (token) {
      runInAction(() => {
        this.token = token;
      });

      try {
        const response = await axiosInstance.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        runInAction(() => {
          this.user = response.data;
        });
      } catch (error) {
        console.error("Failed to load user from token:", error);
        runInAction(() => {
          this.user = null;
        });
      }
    }
  }

  logout() {
    runInAction(() => {
      this.user = null;
      this.token = null;
    });
    localStorage.removeItem("token");
  }
}

const authStore = new AuthStore();
export default authStore;
