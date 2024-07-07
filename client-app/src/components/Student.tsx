// src/components/Student.tsx

import { useEffect, useState } from "react";
import { fetchStudents } from "../services/StudentService";
import { Link } from "react-router-dom";
import { StudentDto } from "../dtos/studentDtos/studentDto";

export const Student = () => {
  const [students, setStudents] = useState<StudentDto[]>([]);

  useEffect(() => {
    const fetchAndSetStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchAndSetStudents();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Students List</h1>
        <Link
          to="/create-student"
          className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Student
        </Link>
      </div>
      <hr className="mb-4" />
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full bg-white border-collapse border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 border border-gray-300">ID</th>
              <th className="py-2 px-4 border border-gray-300">Name</th>
              <th className="py-2 px-4 border border-gray-300">Last Name</th>
              <th className="py-2 px-4 border border-gray-300">Age</th>
              <th className="py-2 px-4 border border-gray-300">Gender</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {students.map((std) => (
              <tr key={std.id}>
                <td className="py-2 px-4 border border-gray-300">{std.id}</td>
                <td className="py-2 px-4 border border-gray-300">{std.name}</td>
                <td className="py-2 px-4 border border-gray-300">
                  {std.lastName}
                </td>
                <td className="py-2 px-4 border border-gray-300">{std.age}</td>
                <td className="py-2 px-4 border border-gray-300">
                  {std.gender}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
