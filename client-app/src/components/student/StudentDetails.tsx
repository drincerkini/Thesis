import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStudentById } from "../../services/StudentService";
import LoadingSpinner from "../LoadingSpinner";
import { studentDetailsDto } from "../../dtos/studentDtos/studentDetailsDto";

const StudentDetails = () => {
  const { id } = useParams<string>();
  const [student, setStudent] = useState<studentDetailsDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      if (id) {
        try {
          const data = await fetchStudentById(parseInt(id));
          setStudent(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching student:", error);
          setError("Failed to fetch student");
          setLoading(false);
        }
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-500 mt-4">{error}</p>;
  }

  if (!student) {
    return <p className="text-red-500 mt-4">Student not found</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Student Details</h1>
      <div className="mt-4 p-4 bg-white shadow-lg rounded-lg">
        <p className="text-xl font-semibold">
          {student.name} {student.lastName}
        </p>
        <p className="text-gray-600">Age: {student.age}</p>
        <p className="text-gray-600">Gender: {student.gender}</p>
        <p className="text-gray-600">Department: {student.department}</p>
        {/* Add other details as needed */}
      </div>
    </div>
  );
};

export default StudentDetails;
