import React from "react";
import universityImage from "../assets/uni.jpg";
import backgroundImage from "../assets/background.jpeg";

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Banner Section */}
      <section
        className="w-full bg-cover bg-center py-20 text-white text-center"
        style={{ backgroundImage: `url(${universityImage})` }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg">
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

      {/* Features Section */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Manage Departments</h3>
              <p className="text-gray-600">
                Easily add, edit, or delete departments from the university.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Student Directory</h3>
              <p className="text-gray-600">
                Access a comprehensive list of students with filtering options.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">
                User Authentication
              </h3>
              <p className="text-gray-600">
                Secure login and registration system to manage user access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
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
    </div>
  );
};

export default Home;
