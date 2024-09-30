import React from "react";
import backgroundImage from "../../assets/background.jpeg";

const CallToActionComponent: React.FC = () => {
  return (
    <section
      className="w-full py-16 text-white text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-lg inline-block">
        <h2 className="text-3xl font-semibold mb-4">Ready to get started?</h2>
        <p className="text-lg mb-6">
          Join our community and start managing your university data
          efficiently.
        </p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300">
          Sign Up Now
        </button>
      </div>
    </section>
  );
};

export default CallToActionComponent;
