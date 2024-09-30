import React from "react";
import backgroundImage from "../../assets/background.jpeg";

const CallToActionComponent: React.FC = () => {
  return (
    <section
      className="w-full py-16 text-white text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-gray-800 bg-opacity-70 p-10 rounded-lg shadow-lg inline-block">
        <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
          Ready to get started?
        </h2>
        <p className="text-lg mb-6 drop-shadow-md">
          Join our community and start managing your university data
          efficiently.
        </p>
        <button className="bg-yellow-500 text-gray-800 px-6 py-2 rounded-full text-lg font-semibold hover:bg-yellow-600 transition duration-300 shadow-md hover:shadow-lg">
          Sign Up Now
        </button>
      </div>
    </section>
  );
};

export default CallToActionComponent;
