import { useEffect, useState } from "react";
import { IDepartment } from "../interfaces/IDepartment";
import { fetchDepartments } from "../services/DepartmentService";

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
