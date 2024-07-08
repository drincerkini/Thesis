import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchStudents } from "../../services/StudentService";
import { StudentDto } from "../../dtos/studentDtos/studentDto";
import LoadingSpinner from "../LoadingSpinner";
import { deleteStudent } from "../../services/StudentService";

export const Student = () => {
  const [students, setStudents] = useState<StudentDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Error fetching students");
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetStudents();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setLoading(true);
      try {
        await deleteStudent(id);
        setStudents(students.filter((student) => student.id !== id));
      } catch (error) {
        console.error("Error deleting student:", error);
        setError("Failed to delete student");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className={`container mx-auto py-8 ${loading ? "opacity-50" : ""}`}>
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
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full bg-white border-collapse border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border border-gray-300">ID</th>
                <th className="py-2 px-4 border border-gray-300">Name</th>
                <th className="py-2 px-4 border border-gray-300">Last Name</th>
                <th className="py-2 px-4 border border-gray-300">Age</th>
                <th className="py-2 px-4 border border-gray-300">Gender</th>
                <th className="py-2 px-4 border border-gray-300">Actions</th>
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
                  <td className="py-2 px-4 border border-gray-300">
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/student/${student.id}`}
                      className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Student;
