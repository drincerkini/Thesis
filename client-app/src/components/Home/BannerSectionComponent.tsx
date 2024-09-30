import React from "react";
import universityImage from "../../assets/uni.jpg";

const BannerSectionComponent: React.FC = () => {
  return (
    <>
      <section
        className="w-full bg-cover bg-center py-20 text-white text-center"
        style={{ backgroundImage: `url(${universityImage})` }}
      >
        <div className=" bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Drini's University
          </h1>
          <p className="text-lg mb-6">
            Discover and manage departments, students, and more with ease.
          </p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300">
            Get Started
          </button>
        </div>
      </section>
    </>
  );
};

export default BannerSectionComponent;
