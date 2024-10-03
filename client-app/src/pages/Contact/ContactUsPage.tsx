import React from "react";
import ContactFormComponent from "../../components/Contact/ContactFormComponent";

const ContactUsPage: React.FC = () => {
  return (
    <div className="container mx-auto mt-12 mb-12 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Contact Us!
        </h3>
        <ContactFormComponent />
      </div>
    </div>
  );
};

export default ContactUsPage;
