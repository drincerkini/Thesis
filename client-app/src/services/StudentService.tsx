import axios from "axios";
import { IStudent } from "../interfaces/IStudent";

const API_BASE_URL = "https://localhost:7098/api/Students";

export const fetchStudents = async (): Promise<IStudent[]> => {
  try {
    const response = await axios.get<IStudent[]>(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Erro fetsching departmets: ", error);
    throw error;
  }
};
