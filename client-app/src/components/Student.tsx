import { useEffect, useState } from "react";
import { IStudent } from "../interfaces/IStudent";
import { fetchStudents } from "../services/StudentService";

export const Student = () => {
  const [students, setStudents] = useState<IStudent[]>([]);

  useEffect(() => {
    const fetchAndSetStudents = async () => {
      try {
        const data = await fetchStudents();

        setStudents(data);
      } catch (error) {
        console.error("Error fetching Students:", error);
      }
    };

    fetchAndSetStudents();
  }, []);

  return (
    <>
      <h2> Students List:</h2>
      <hr />

      <ul>
        {students.map((std) => (
          <li key={std.id}>
            {std.name} - {std.lastName}
          </li>
        ))}
      </ul>
    </>
  );
};
