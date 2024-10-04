import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import applicationsStore from "../../stores/applicationsStore";

const ContactListComponent: React.FC = () => {
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        await applicationsStore.fetchApplications();
      } catch (error) {
        toast.error("Failed to fetch contacts");
      }
    };

    fetchContacts();
  }, []);

  if (applicationsStore.loading) {
    return <div>Loading contacts...</div>;
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
            <th className="px-4 py-2 border border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applicationsStore.applicationList.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center px-4 py-2">
                No contacts found
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

      {/* Error display if no contacts */}
      {applicationsStore.applicationList.length === 0 && (
        <div className="text-red-500 text-center mt-4">
          No contacts available. Please try again later.
        </div>
      )}
    </div>
  );
};

export default observer(ContactListComponent);
