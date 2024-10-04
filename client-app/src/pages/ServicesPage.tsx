import React, { useState } from "react";
import banner3 from "../assets/img/banner3.jpg";
import banner4 from "../assets/img/banner4.jpg";
import banner5 from "../assets/img/banner5.jpg";
import banner6 from "../assets/img/banner6.jpg";
import { Link } from "react-router-dom";

const ServicesPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of slides with image imports
  const slides = [
    {
      title: "Welcome to Our University",
      description:
        "Providing quality education and state-of-the-art facilities.",
      imageUrl: banner5,
    },
    {
      title: "Explore Our Campus",
      description: "Experience a vibrant and inclusive campus community.",
      imageUrl: banner4,
    },
    {
      title: "Shape Your Future",
      description:
        "Join us and embark on a journey of personal and academic growth.",
      imageUrl: banner3,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Slider Section */}
      <div className="relative w-full h-80 mb-12">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img
          src={slides[currentSlide].imageUrl}
          alt={slides[currentSlide].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4">
          <h2 className="text-4xl font-bold mb-4">
            {slides[currentSlide].title}
          </h2>
          <p className="text-lg mb-8">{slides[currentSlide].description}</p>
          <div className="flex space-x-4">
            <button
              onClick={prevSlide}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full"
            >
              Prev
            </button>
            <button
              onClick={nextSlide}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          University Services
        </h1>

        {/* Academic Services Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Academic Services
          </h2>
          {/* Line Under Title */}
          <div className="bg-gray-300 h-[2px] w-100 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                Course Registration
              </h3>
              <p className="text-gray-600">
                Easily register for courses each semester using our streamlined
                registration system. Plan your academic path with guidance from
                our academic advisors.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                Research Facilities
              </h3>
              <p className="text-gray-600">
                Access state-of-the-art labs, libraries, and research centers
                that support both undergraduate and postgraduate research across
                a variety of disciplines.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                Career Counseling
              </h3>
              <p className="text-gray-600">
                Our career services team provides guidance on internships,
                career planning, and resume writing, helping students transition
                from academic to professional life.
              </p>
            </div>
          </div>
        </section>

        {/* Campus Services Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Campus Services
          </h2>
          {/* Line Under Title */}
          <div className="bg-gray-300 h-[2px] w-100 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-green-600 mb-4">
                Student Housing
              </h3>
              <p className="text-gray-600">
                On-campus housing options include dormitories and apartments
                with various amenities to ensure a comfortable stay for all
                students.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-green-600 mb-4">
                Dining Services
              </h3>
              <p className="text-gray-600">
                A variety of dining options including meal plans, cafes, and
                healthy food choices are available to suit every student's
                taste.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-green-600 mb-4">
                Health & Wellness
              </h3>
              <p className="text-gray-600">
                The university provides health services, including mental health
                counseling, medical consultations, and wellness programs to
                promote student well-being.
              </p>
            </div>
          </div>
        </section>

        {/* Student Support Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Student Support
          </h2>
          {/* Line Under Title */}
          <div className="bg-gray-300 h-[2px] w-100 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">
                Financial Aid
              </h3>
              <p className="text-gray-600">
                The financial aid office helps students with scholarships,
                grants, and student loan programs to support their education
                costs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">
                International Student Services
              </h3>
              <p className="text-gray-600">
                We provide comprehensive support for international students,
                including visa assistance, orientation programs, and cultural
                integration services.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">
                Disability Services
              </h3>
              <p className="text-gray-600">
                The university offers accommodations and support for students
                with disabilities to ensure they have equal access to education
                and campus life.
              </p>
            </div>
          </div>
        </section>

        <section
          className="w-full py-16 text-white text-center bg-cover bg-center"
          style={{ backgroundImage: `url(${banner6})` }}
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
              <Link to="/application">APPLY NOW</Link>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesPage;
