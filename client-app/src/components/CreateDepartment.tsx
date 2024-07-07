import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDepartment } from "../services/DepartmentService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CreateDepartment = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await createDepartment({ name, description });

      setError(null);
      toast.success("Department created successfully!");

      setLoading(false);

      navigate("/department");
    } catch (error) {
      setError("Failed to create department");
      toast.error("Failed to create department");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create Department</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Department Name:
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
              Department Description:
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
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
    </>
  );
};
