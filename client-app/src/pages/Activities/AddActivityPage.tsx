import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import activityStore from "../../stores/activityStore";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddActivityPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate input fields
    if (!title || !category || !description || !image || !createdAt) {
      setError("All fields are required.");
      return;
    }

    // Create a FormData object and append the fields
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description); // Append description
    formData.append("createdAt", createdAt); // Append createdAt
    if (image) {
      formData.append("image", image);
    }

    try {
      await activityStore.addActivity(formData); // Call MobX store to add activity

      // Navigate to activities list page
      navigate("/activities");

      // Show success toast after a short delay
      setTimeout(() => {
        toast.success("Activity added successfully!");
      }, 100);
    } catch (err) {
      setError("Failed to add activity. Please try again.");
      console.error(err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto max-w-lg bg-white shadow-lg p-6 rounded-lg">
        <h1 className="text-3xl font-semibold mb-6">Add Activity</h1>

        {error && (
          <div className="text-red-500 bg-red-100 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter activity title"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter activity category"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter activity description"
              rows={4} // Set the number of rows for the textarea
            />
          </div>

          <div>
            <label
              htmlFor="createdAt"
              className="block text-sm font-medium text-gray-700"
            >
              Created At
            </label>
            <input
              type="date"
              id="createdAt"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          >
            Submit Activity
          </button>
        </form>

        {/* Add ToastContainer to display toast notifications */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default observer(AddActivityPage);
