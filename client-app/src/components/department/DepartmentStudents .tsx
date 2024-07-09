import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchStudentsByDepartment } from "../../services/DepartmentService";
import { StudentListDto } from "../../dtos/departmentDtos/studentListDto";
import LoadingSpinner from "../LoadingSpinner";
import Search from "../Search"; // Import the Search component
import Pagination from "../Pagination"; // Import the Pagination component

const DepartmentStudents = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const [students, setStudents] = useState<StudentListDto[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentListDto[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof StudentListDto | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); // Number of students per page

  useEffect(() => {
    const fetchStudents = async () => {
      if (departmentId) {
        try {
          const data = await fetchStudentsByDepartment(parseInt(departmentId));
          setStudents(data);
          setFilteredStudents(data);
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

  const handleSearch = (term: string) => {
    const filteredData = students.filter((student) =>
      student.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredStudents(filteredData);
  };

  const handleSort = (field: keyof StudentListDto) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    const sortedData = [...filteredStudents].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredStudents(sortedData);
  };

  // Pagination handlers
  const totalPages = Math.ceil(filteredStudents.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate current page students
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

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
      <Search onSearch={handleSearch} />
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full bg-white border-collapse border border-gray-300 mt-4">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 border border-gray-300">
                <button className="text-white" onClick={() => handleSort("id")}>
                  ID{" "}
                  {sortField === "id"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : "↑↓"}
                </button>
              </th>
              <th className="py-2 px-4 border border-gray-300">
                <button
                  className="text-white"
                  onClick={() => handleSort("name")}
                >
                  Name{" "}
                  {sortField === "name"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : "↑↓"}
                </button>
              </th>
              <th className="py-2 px-4 border border-gray-300">
                <button
                  className="text-white"
                  onClick={() => handleSort("lastName")}
                >
                  Last Name{" "}
                  {sortField === "lastName"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : "↑↓"}
                </button>
              </th>
              <th className="py-2 px-4 border border-gray-300">
                <button
                  className="text-white"
                  onClick={() => handleSort("age")}
                >
                  Age{" "}
                  {sortField === "age"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : "↑↓"}
                </button>
              </th>
              <th className="py-2 px-4 border border-gray-300">
                <button
                  className="text-white"
                  onClick={() => handleSort("gender")}
                >
                  Gender{" "}
                  {sortField === "gender"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : "↑↓"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {currentStudents.map((student) => (
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DepartmentStudents;
