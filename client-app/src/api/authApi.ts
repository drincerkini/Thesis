import axiosInstance from "../services/axiosConfig";

export interface LoginPayload {
  username: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  try {
    const response = await axiosInstance.post("/auth/login", payload);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Failed to login");
  }
};

export const fetchCurrentUser = async (token: string) => {
  try {
    const response = await axiosInstance.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Fetch current user error:", error);
    throw new Error("Failed to fetch user");
  }
};
