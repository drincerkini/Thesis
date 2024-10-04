import React from "react";
import universityImage from "../../assets/backimg.jpg";
import { Link } from "react-router-dom";

const BannerSectionComponent: React.FC = () => {
  return (
    <section
      className="w-full bg-cover bg-center py-20 text-white text-center"
      style={{ backgroundImage: `url(${universityImage})` }}
    >
      <div className="bg-gray-800 bg-opacity-70 p-10 rounded-lg shadow-xl ">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
          Welcome to Drini's University
        </h1>
        <p className="text-xl mb-6 drop-shadow-md">
          Discover and manage departments, students, and more with ease.
        </p>
        <button className="bg-yellow-500 text-gray-800 px-6 py-2 rounded-full text-lg font-semibold hover:bg-yellow-600 transition duration-300 shadow-md hover:shadow-lg">
          <Link to="/application">APPLY NOW</Link>
        </button>
      </div>
    </section>
  );
};

export default BannerSectionComponent;
