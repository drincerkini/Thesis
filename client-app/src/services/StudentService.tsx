import { createStudentDto } from "../dtos/studentDtos/createStudentDto";
import { studentDetailsDto } from "../dtos/studentDtos/studentDetailsDto";
import { StudentDto } from "../dtos/studentDtos/studentDto";
import axios from "axios";

const API_BASE_URL = "https://localhost:7098/api/students";

export const fetchStudents = async (): Promise<StudentDto[]> => {
  try {
    const response = await axios.get<StudentDto[]>(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const fetchStudentById = async (
  id: number
): Promise<studentDetailsDto> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  const studentData = response.data as studentDetailsDto;

  // Fetch department details separately
  const departmentResponse = await axios.get(
    `https://localhost:7098/api/departments/${studentData.departmentId}`
  );
  const departmentData = departmentResponse.data;

  // Merge department data into studentData
  const studentWithDepartment: studentDetailsDto = {
    ...studentData,
    department: departmentData.name, // Assuming department name is returned from API
  };

  return studentWithDepartment;
};

export const createStudent = async (student: createStudentDto) => {
  try {
    const response = await axios.post(API_BASE_URL, student);
    return response.data;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

export const deleteStudent = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};
