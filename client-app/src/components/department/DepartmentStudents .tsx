// components/DepartmentStudents.tsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchStudentsByDepartment } from "../../services/DepartmentService";
import { StudentListDto } from "../../dtos/departmentDtos/studentListDto";
import LoadingSpinner from "../LoadingSpinner";

const DepartmentStudents = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const [students, setStudents] = useState<StudentListDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      if (departmentId) {
        try {
          const data = await fetchStudentsByDepartment(parseInt(departmentId));
          setStudents(data);
        } catch (error) {
          console.error("Error fetching students:", error);
          setError("Failed to fetch students");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStudents();
  }, [departmentId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-500 mt-4">{error}</p>;
  }

  if (students.length === 0) {
    return (
      <>
        <p className="text-gray-600 mt-4 mr-10">
          No students found for this department.
        </p>
        <Link
          to="/department"
          className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go back to Departments...
        </Link>
      </>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">
        Students in Department {departmentId}
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full bg-white border-collapse border border-gray-300 mt-4">
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
            {students.map((student) => (
              <tr key={student.id}>
                <td className="py-2 px-4 border border-gray-300">
                  {student.id}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {student.name}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {student.lastName}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {student.age}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {student.gender}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentStudents;
