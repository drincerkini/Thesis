import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../services/StudentService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchDepartments } from "../services/DepartmentService";
import { createStudentDto } from "../dtos/studentDtos/createStudentDto";

export const CreateStudent: React.FC = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState("");
  const [departmentId, setDepartmentId] = useState<number>(0); // State for selected department ID
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [departmentsData, setDepartmentsData] = useState<
    { id: number; name: string }[]
  >([]); // State to store departments

  useEffect(() => {
    fetchDepartmentsData(); // Fetch departments on component mount
  }, []);

  const fetchDepartmentsData = async () => {
    try {
      const departmentsData = await fetchDepartments(); // Fetch departments from your service
      setDepartmentsData(departmentsData); // Set departments into state
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const newStudent: createStudentDto = {
        name,
        lastName,
        age,
        gender,
        departmentId,
      };

      // Call service function to create student
      await createStudent(newStudent);
      toast.success("Student created successfully!");
      setLoading(false);

      // Navigate back to student list page after a short delay to show the toast message

      navigate("/student");
    } catch (error) {
      setError("Failed to create student");
      toast.error("Failed to create student");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Student</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Name:
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Age:
          </label>
          <input
            type="number"
            value={age === 0 ? "" : age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Gender:
          </label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Department:
          </label>
          <select
            value={departmentId}
            onChange={(e) => setDepartmentId(parseInt(e.target.value))}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Department</option>
            {departmentsData.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
      {loading && <p className="text-blue-500 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};
