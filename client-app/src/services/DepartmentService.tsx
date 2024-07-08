import axios from "axios";
import { createDepartmentDto } from "../dtos/departmentDtos/createDepartmentDto";
import axiosInstance from "../helpers/axiosInstance";
import { DepartmentDto } from "../dtos/departmentDtos/departmentDto";

const API_BASE_URL = "https://localhost:7098/api/departments";

export const fetchDepartments = async (): Promise<DepartmentDto[]> => {
  try {
    const response = await axios.get<DepartmentDto[]>(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching departments: ", error);
    throw error;
  }
};

export const fetchDepartmentById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
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

export const deleteDepartment = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const updateDepartment = async (
  id: number,
  department: { name: string; description: string }
) => {
  console.log("Updating department:", id, department); // Add console log
  const response = await axios.put(`${API_BASE_URL}/${id}`, department);
  return response.data;
};
