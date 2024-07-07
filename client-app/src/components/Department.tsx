import { useEffect, useState } from "react";
import { IDepartment } from "../interfaces/IDepartment";
import { fetchDepartments } from "../services/DepartmentService";
import { Link } from "react-router-dom";

export const Department = () => {
  const [departments, setDepartments] = useState<IDepartment[]>([]);

  useEffect(() => {
    const fetchAndSetDepartments = async () => {
      try {
        const data = await fetchDepartments();

        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchAndSetDepartments();
  }, []);

  return (
    <>
      <h4>
        <Link to="/create-department">Create Department</Link>
      </h4>

      <hr />

      <div>
        <h2>Departments List: </h2>
      </div>
      <hr />
      <ul>
        {departments.map((dept) => (
          <li key={dept.id}>
            {dept.name} --- {dept.description}
          </li>
        ))}
      </ul>
    </>
  );
};
