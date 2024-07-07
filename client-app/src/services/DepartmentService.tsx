import axios from "axios";
import { IDepartment } from "../interfaces/IDepartment";

const API_BASE_URL = "https://localhost:7098/api/Departments";

export const fetchDepartments = async (): Promise<IDepartment[]> => {
  try {
    const response = await axios.get<IDepartment[]>(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Erro fetsching departmets: ", error);
    throw error;
  }
};
