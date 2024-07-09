import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DepartmentDto } from "../../dtos/departmentDtos/departmentDto";
import {
  fetchDepartments,
  deleteDepartment,
} from "../../services/DepartmentService";
import LoadingSpinner from "../LoadingSpinner"; // Import the LoadingSpinner component

export const Department = () => {
  const [departments, setDepartments] = useState<DepartmentDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndSetDepartments = async () => {
      try {
        const data = await fetchDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setError("Error fetching departments");
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetDepartments();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      setLoading(true);
      try {
        await deleteDepartment(id);
        setDepartments(departments.filter((dept) => dept.id !== id));
      } catch (error) {
        console.error("Error deleting department:", error);
        setError("Failed to delete department");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleShowStudents = (departmentId: number) => {
    navigate(`/department/${departmentId}/students`);
  };

  return (
    <>
      {loading && <LoadingSpinner />}{" "}
      {/* Conditionally render the LoadingSpinner */}
      <div className={`container mx-auto py-8 ${loading ? "opacity-50" : ""}`}>
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Departments List</h1>
          <Link
            to="/create-department"
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Department
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
                <th className="py-2 px-4 border border-gray-300">
                  Description
                </th>
                <th className="py-2 px-4 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {departments.map((dept) => (
                <tr key={dept.id}>
                  <td className="py-2 px-4 border border-gray-300">
                    {dept.id}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {dept.name}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {dept.description}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    <Link
                      to={`/department/${dept.id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => handleDelete(dept.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleShowStudents(dept.id)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
                    >
                      Show Students
                    </button>
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

export default Department;
