import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { createDepartment } from "../services/DepartmentService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CreateDepartment = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await createDepartment({ name, description });

      setError(null);
      toast.success("Department created successfully!");

      setLoading(false);

      // Navigate back to home page after a short delay to show the toast message
      setTimeout(() => {
        navigate("/department");
      }, 2000);
    } catch (error) {
      setError("Failed to create department");
      toast.error("Failed to create department");
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h2>Create Department</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Department Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Department Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <ToastContainer />
    </>
  );
};
