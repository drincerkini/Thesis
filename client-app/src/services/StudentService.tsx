import axiosInstance from "../helpers/axiosInstance";
import { createStudentDto } from "../dtos/studentDtos/createStudentDto";
import { StudentDto } from "../dtos/studentDtos/studentDto";

export const fetchStudents = async (): Promise<StudentDto[]> => {
  try {
    const response = await axiosInstance.get<StudentDto[]>("/students");
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const createStudent = async (student: createStudentDto) => {
  try {
    const response = await axiosInstance.post("/students", student);
    return response.data;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};
