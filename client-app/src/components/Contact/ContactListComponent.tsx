import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import applicationsStore from "../../stores/applicationsStore";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ApplicationListComponent: React.FC = () => {
  useEffect(() => {
    // Fetch applications when the component mounts
    const fetchApplications = async () => {
      try {
        await applicationsStore.fetchApplications();
      } catch (error) {
        toast.error("Failed to fetch applications");
      }
    };

    fetchApplications();
  }, []);

  if (applicationsStore.loading) {
    return <div>Loading applications...</div>;
  }

  if (applicationsStore.error) {
    return <div>Error: {applicationsStore.error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-200">Name</th>
            <th className="px-4 py-2 border border-gray-200">Surname</th>
            <th className="px-4 py-2 border border-gray-200">Email</th>
            <th className="px-4 py-2 border border-gray-200">Department</th>
            <th className="px-4 py-2 border border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applicationsStore.applicationList.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center px-4 py-2">
                No applications found
              </td>
            </tr>
          ) : (
            applicationsStore.applicationList.map((application) => (
              <tr key={application._id}>
                <td className="px-4 py-2 border border-gray-200">
                  {application.name}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {application.surname}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {application.email}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {application.department}
                </td>
                <td className="px-4 py-2 border border-gray-200 text-center">
                  <Link to={`/application/${application._id}`}>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default observer(ApplicationListComponent);
