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
    <div className="container mx-auto mt-6">
      <h1 className="text-xl font-bold mb-4">Contact List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-200">Name</th>
              <th className="px-4 py-2 border border-gray-200">Surname</th>
              <th className="px-4 py-2 border border-gray-200">Email</th>
              <th className="px-4 py-2 border border-gray-200">Phone</th>
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
                  <td className="px-4 py-2 border border-gray-200">
                    {contact.phoneNumber || "N/A"}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {contact.message}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-center">
                    <button className="text-black-600 hover:text-black-800">
                      <Link to={`/contact/${contact._id}`}>View</Link>
                    </button>
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-center">
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Handle delete action
const handleDelete = async (id: string) => {
  try {
    await ContactStore.deleteContact(id);
    toast.success("Contact deleted successfully");
  } catch (error) {
    toast.error("Failed to delete contact");
  }
};

export default observer(ContactListComponent);
