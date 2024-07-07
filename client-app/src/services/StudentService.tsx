import axiosInstance from "../helpers/axiosInstance";
import { IStudent } from "../interfaces/IStudent";
import { createStudentDto } from "../dtos/studentDtos/createStudentDto";

export const fetchStudents = async (): Promise<IStudent[]> => {
  try {
    const response = await axiosInstance.get<IStudent[]>("/students");
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
