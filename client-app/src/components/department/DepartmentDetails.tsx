import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchDepartmentById } from "../../services/DepartmentService";
import LoadingSpinner from "../LoadingSpinner";
import { DepartmentDetailsDto } from "../../dtos/departmentDtos/departmentDetailsDto"; // Adjust as per your DTO structure

export const DepartmentDetails: React.FC = () => {
  const { id } = useParams<string>();
  const [department, setDepartment] = useState<DepartmentDetailsDto | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartment = async () => {
      if (id) {
        // Check if id is defined
        try {
          const data = await fetchDepartmentById(parseInt(id, 10)); // Ensure to parse id as an integer if needed
          setDepartment(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching department:", error);
          setError("Failed to fetch department");
          setLoading(false);
        }
      }
    };

    fetchDepartment();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-500 mt-4">{error}</p>;
  }

  if (!department) {
    return <p className="text-red-500 mt-4">Department not found</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Department Details</h1>
      <div className="mt-4 p-4 bg-white shadow-lg rounded-lg">
        <p className="text-xl font-semibold">{department.name}</p>
        <p className="text-gray-600">{department.description}</p>
        {/* Add other details as needed */}
      </div>
    </div>
  );
};

export default DepartmentDetails;
