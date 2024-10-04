import React from "react";
import AboutUsSection from "../components/About/AboutUsSection";
import AboutUniSection from "../components/About/AboutUniSection";

export const AboutPage: React.FC = () => {
  return (
    <>
      <div className="text-4xl font-bold text-center text-gray-800 mb-10">
        About Our College
      </div>
      {/* Line Under Title */}
      <div className="bg-gray-300 h-[2px] w-100 mb-6"></div>

      <AboutUniSection />

      <AboutUsSection />
    </>
  );
};
