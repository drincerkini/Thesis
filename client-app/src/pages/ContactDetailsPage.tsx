import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import contactsStore from "../stores/contactsStore";

const ContactDetailsComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      if (id) {
        await contactsStore.fetchContactById(id);
      }
    };

    fetchContact();
  }, [id]);

  const contact = contactsStore.currentContact;

  if (contactsStore.loading || !contact) {
    return <div className="text-center mt-6">Loading contact details...</div>;
  }

  // Handle 'Go Back' action
  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Contact Details
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Name:</strong>
          </div>
          <div>{contact.name}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Surname:</strong>
          </div>
          <div>{contact.surname}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Email:</strong>
          </div>
          <div>{contact.email}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Phone Number:</strong>
          </div>
          <div>{contact.phoneNumber || "N/A"}</div>
        </div>
        <div className="mb-4">
          <strong>Message:</strong>
          <p className="mt-2 text-gray-700">{contact.message}</p>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={handleGoBack}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(ContactDetailsComponent);
