import React from "react";

const ApplicationPage: React.FC = () => {
  return (
    <div className="container mx-auto mt-10 mb-10">
      <div className="bg-white shadow-lg rounded-lg">
        <div className="flex flex-col">
          <h3 className="text-center text-3xl font-semibold mt-8">
            Apply for University
          </h3>
          <div className="p-8">
            <form className="space-y-6">
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
                    type="text"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Name"
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
                    type="text"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Surname"
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
                    type="email"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Email"
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
                    type="date"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Date of Birth"
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
                    type="text"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Address"
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
                    type="text"
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
                    type="text"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Department"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
