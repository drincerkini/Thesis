import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchStudents, deleteStudent } from "../../services/StudentService";
import { StudentDto } from "../../dtos/studentDtos/studentDto";
import LoadingSpinner from "../LoadingSpinner";
import Search from "../Search"; // Assuming you have implemented the Search component
import Pagination from "../Pagination"; // Import the Pagination component

export const Student = () => {
  const [students, setStudents] = useState<StudentDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredStudents, setFilteredStudents] = useState<StudentDto[]>([]);
  const [ageFilter, setAgeFilter] = useState<number | undefined>();
  const [genderFilter, setGenderFilter] = useState<string>("");
  const [resetFilters, setResetFilters] = useState(false); // State for reset button
  const [sortField, setSortField] = useState<keyof StudentDto | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); // Number of students per page

  useEffect(() => {
    const fetchAndSetStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
        setFilteredStudents(data); // Initialize filtered students with all students
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
        setFilteredStudents(
          filteredStudents.filter((student) => student.id !== id)
        ); // Update filtered students as well
      } catch (error) {
        console.error("Error deleting student:", error);
        setError("Failed to delete student");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSort = (field: keyof StudentDto) => {
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

  // Function to filter students based on selected filters
  const applyFilters = () => {
    let filteredData = [...students];

    if (typeof ageFilter !== "undefined") {
      filteredData = filteredData.filter(
        (student) => student.age === ageFilter
      );
    }

    if (genderFilter) {
      filteredData = filteredData.filter(
        (student) => student.gender.toLowerCase() === genderFilter.toLowerCase()
      );
    }

    setFilteredStudents(filteredData);
  };

  // Call applyFilters whenever any filter state changes
  useEffect(() => {
    applyFilters();
  }, [ageFilter, genderFilter, resetFilters]);

  const handleSearch = (term: string) => {
    const filteredData = students.filter((student) =>
      student.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredStudents(filteredData); // Update filtered students based on search term
  };

  const handleResetFilters = () => {
    setAgeFilter(undefined);
    setGenderFilter("");
    setResetFilters((prev) => !prev); // Toggle resetFilters state to trigger useEffect
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
        <Search onSearch={handleSearch} />
        <div className="mb-4 flex items-center">
          <div className="mr-4">
            <label htmlFor="ageFilter" className="mr-2">
              Age:
            </label>
            <input
              type="number"
              id="ageFilter"
              value={ageFilter || ""}
              onChange={(e) => setAgeFilter(parseInt(e.target.value))}
              className="border p-2"
            />
          </div>
          <div>
            <label htmlFor="genderFilter" className="mr-2">
              Gender:
            </label>
            <select
              id="genderFilter"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="border p-2"
            >
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button
            onClick={handleResetFilters}
            className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Reset Filters
          </button>
        </div>
        <hr className="mb-4" />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full bg-white border-collapse border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border border-gray-300">
                  <button
                    className="text-white"
                    onClick={() => handleSort("id")}
                  >
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
                <th className="py-2 px-4 border border-gray-300">Actions</th>
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Student;
