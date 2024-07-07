import axios from "axios";
import { createDepartmentDto } from "../dtos/departmentDtos/createDepartmentDto";
import axiosInstance from "../helpers/axiosInstance";
import { DepartmentDto } from "../dtos/departmentDtos/departmentDto";

const API_BASE_URL = "https://localhost:7098/api/Departments";

export const fetchDepartments = async (): Promise<DepartmentDto[]> => {
  try {
    const response = await axios.get<DepartmentDto[]>(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Erro fetsching departmets: ", error);
    throw error;
  }
};

export const createDepartment = async (department: createDepartmentDto) => {
  try {
    const response = await axiosInstance.post("/departments", department);
    return response.data;
  } catch (error) {
    console.error("Error creating department", error);
    throw error;
  }
};
