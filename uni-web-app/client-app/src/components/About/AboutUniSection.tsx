import React from "react";
import slide1 from "../../assets/abu.jpeg";

const AboutUniSection: React.FC = () => {
  return (
    <section id="about-section" className="py-5">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          {/* Image Section */}
          <div className="w-full md:w-7/12 order-last md:order-first relative z-10">
            <div className="relative">
              <img
                src={slide1}
                alt="About College"
                className="w-full h-auto object-cover"
              />
            </div>
            <hr className="my-5" />
          </div>

          {/* About Text Section */}
          <div className="w-full md:w-5/12">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">ABOUT OUR COLLEGE</h2>
              <p className="text-lg mb-4">We've been serving for ages!</p>
              <p className="text-gray-700">
                The university opened with a mass held at Prishtina Minster on 4
                April 1460. It has undergone dynamic development ever since its
                inception. During the first year following its founding, the
                University Register in Prishtina listed 226 students and
                lecturers. Today, the seven faculties at the University of Drin
                have around 13,000 students and over 350 professors...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUniSection;
