// authApi.ts
import axios from "axios";

export const loginApi = async (username: string, password: string) => {
  const response = await axios.post("http://localhost:5001/api/auth/login", {
    username,
    password,
  });
  return response.data; // Return token and user data
};
