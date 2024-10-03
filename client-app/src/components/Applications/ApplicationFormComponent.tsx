import React, { useState } from "react";
import { observer } from "mobx-react-lite"; // Import observer for MobX
import applicationStore from "../../stores/applicationsStore"; // Adjust the import path as needed
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ApplicationFormComponent = () => {
  const navigate = useNavigate();
  // State to hold form input values
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    birthDate: "",
    address: "",
    phoneNumber: "",
    department: "",
  });

  // State to handle form submission error
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      await applicationStore.addApplication(formData); // Call MobX store method
      setFormData({
        name: "",
        surname: "",
        email: "",
        birthDate: "",
        address: "",
        phoneNumber: "",
        department: "",
      });
      toast.success("Contact form submitted successfully");
      navigate("/");
    } catch (err) {
      setError("Failed to submit application. Please try again."); // Set error message
      toast.error("Failed to submit the contact form");
    }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Display error message */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 required-field"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Name"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 required-field"
              htmlFor="surname"
            >
              Surname
            </label>
            <input
              id="surname"
              name="surname"
              type="text"
              value={formData.surname}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Surname"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 required-field"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 required-field"
              htmlFor="birthdate"
            >
              Date of Birth
            </label>
            <input
              id="birthdate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 required-field"
              htmlFor="address"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Address"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 required-field"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phoneNumber"
              type="text"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Phone Number"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 required-field"
              htmlFor="department"
            >
              Department
            </label>
            <input
              id="department"
              name="department"
              type="text"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Department"
              required
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full md:w-1/3 bg-indigo-600 text-white py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
          >
            APPLY
          </button>
        </div>
      </form>
    </>
  );
};

export default observer(ApplicationFormComponent);
