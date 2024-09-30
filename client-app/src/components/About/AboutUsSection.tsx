import React from "react";
import { Link } from "react-router-dom";
import campusImage from "../../assets/img/abuu.jpeg";
import { FaFacebook, FaInstagram, FaPinterest } from "react-icons/fa";

const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="py-10 bg-gray-100">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          {/* About Text Section */}
          <div className="w-full lg:w-6/12 flex items-center justify-start mb-10 lg:mb-0">
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold mb-4">
                  About DFT University
                </h3>
                <p className="text-gray-700 mb-4">
                  The University of DFT has an international reputation for
                  outstanding achievements in research and teaching. Founded in
                  1460, the University of DFT is the oldest university in
                  Switzerland and has a history of success spanning over 550
                  years.
                </p>
                <p className="text-gray-700 mb-4">
                  As a comprehensive university offering a wide range of
                  high-quality educational opportunities, the University of
                  Basel attracts students from Switzerland and the entire world.
                  Today, the University of DFT has around 13,000 students from
                  over a hundred nations, including 3,000 PhD students.
                </p>
                <p className="text-gray-700">
                  The goal of medical aesthetic clinics is to help patients
                  achieve their desired cosmetic results while prioritizing
                  their safety and well-being.
                </p>

                {/* Social Media Links */}
                <div className="flex space-x-4 mt-5">
                  <a href="#" className="text-gray-800 hover:text-indigo-600">
                    <FaFacebook className="text-2xl" />
                  </a>
                  <a href="#" className="text-gray-800 hover:text-indigo-600">
                    <FaInstagram className="text-2xl" />
                  </a>
                  <a href="#" className="text-gray-800 hover:text-indigo-600">
                    <FaPinterest className="text-2xl" />
                  </a>
                </div>

                {/* Apply Button */}
                <Link
                  to="/application"
                  className="inline-block mt-6 px-8 py-3 border-2 border-gray-800 text-gray-800 uppercase font-bold rounded-full hover:bg-gray-800 hover:text-white transition-all duration-300"
                >
                  Apply to be part of us
                </Link>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-6/12 flex justify-center">
            <img
              src={campusImage}
              alt="Campus Photo"
              className="max-w-full h-auto rounded-lg shadow-lg"
              style={{ width: "800px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
