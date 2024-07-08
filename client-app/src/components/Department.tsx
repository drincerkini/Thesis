import { useEffect, useState } from "react";
import { fetchDepartments } from "../services/DepartmentService";
import { Link } from "react-router-dom";
import { DepartmentDto } from "../dtos/departmentDtos/departmentDto";
import LoadingSpinner from "./LoadingSpinner"; // Import the LoadingSpinner component

export const Department = () => {
  const [departments, setDepartments] = useState<DepartmentDto[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchAndSetDepartments = async () => {
      try {
        const data = await fetchDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchAndSetDepartments();
  }, []);

  return (
    <div className="container mx-auto py-8">
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
      {loading ? ( // Conditionally render the LoadingSpinner
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full bg-white border-collapse border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border border-gray-300">ID</th>
                <th className="py-2 px-4 border border-gray-300">Name</th>
                <th className="py-2 px-4 border border-gray-300">
                  Description
                </th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Department;
