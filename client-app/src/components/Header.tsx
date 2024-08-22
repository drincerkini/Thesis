import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="p-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">University App</Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/departments" className="hover:text-blue-600">
              Departments
            </Link>
          </li>
          <li>
            <Link to="/students" className="hover:text-blue-600">
              Students
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
