import React from "react";
import ContactListComponent from "../../components/Contacts/ContactListComponent";

const ContactListPage = () => {
  return (
    <>
      <div className="container mx-auto mt-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Contact List
        </h1>

        <ContactListComponent />
      </div>
    </>
  );
};

export default ContactListPage;
