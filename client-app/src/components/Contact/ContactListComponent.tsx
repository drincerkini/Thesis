import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import ContactStore from "../../stores/contactsStore";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ContactListComponent: React.FC = () => {
  useEffect(() => {
    // Fetch contacts when the component mounts
    const fetchContacts = async () => {
      try {
        await ContactStore.fetchContacts();
      } catch (error) {
        toast.error("Failed to fetch contacts");
      }
    };

    fetchContacts();
  }, []);

  if (ContactStore.loading) {
    return <div>Loading contacts...</div>;
  }

  if (ContactStore.error) {
    return <div>Error: {ContactStore.error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-200">Name</th>
            <th className="px-4 py-2 border border-gray-200">Surname</th>
            <th className="px-4 py-2 border border-gray-200">Email</th>
            <th className="px-4 py-2 border border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ContactStore.contactList.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center px-4 py-2">
                No contacts found
              </td>
            </tr>
          ) : (
            ContactStore.contactList.map((contact) => (
              <tr key={contact._id}>
                <td className="px-4 py-2 border border-gray-200">
                  {contact.name}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {contact.surname}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {contact.email}
                </td>
                <td className="px-4 py-2 border border-gray-200 text-center">
                  <Link to={`/contact/${contact._id}`}>
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

export default observer(ContactListComponent);
