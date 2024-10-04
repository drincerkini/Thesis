import React from "react";
import { Link } from "react-router-dom";

const ApplySectionComponent = () => {
  return (
    <section
      className="navbar navbar-expand-lg p-2 w-full"
      style={{ backgroundColor: "#060832" }}
    >
      <div className="container flex items-center justify-center space-x-4">
        <h3 className="text-white mr-40">ACADEMIC YEAR 2024/2025</h3>
        <Link
          to="/application"
          className="nav-item nav-link bg-white text-black-600 px-4 py-2 rounded shadow hover:bg-gray-100"
        >
          APPLY NOW
        </Link>
      </div>
    </section>
  );
};

export default ApplySectionComponent;
