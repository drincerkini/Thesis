import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import authStore from "../stores/authStore";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    authStore.logout();
    navigate("/login");
    setShowDropdown(false);
  };

  const toggleUserDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeUserDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <>
      {/* Fixed Top Section */}
      <section
        className="navbar navbar-expand-lg p-2 w-full fixed top-0 left-0 z-50"
        style={{ backgroundColor: "#060832" }} // Using the dark blue color
      >
        <div className="container flex items-center justify-center space-x-4">
          <h3 className="text-white mr-40">VITI AKADEMIK 2024/2025</h3>
          <Link
            to="/application"
            className="nav-item nav-link bg-white text-black-600 px-4 py-2 rounded shadow hover:bg-gray-100 focus:outline-none focus:border-b-4 focus:border-[#060832] transition duration-200"
          >
            APLIKO TANI
          </Link>
        </div>
      </section>

      {/* Fixed Header (below top section) */}
      <header className="p-4 bg-white shadow-md border-b border-gray-200 fixed w-full top-[3rem] z-40">
        <nav className="container mx-auto flex justify-between items-center">
          {/* Home Link */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-2xl font-semibold text-gray-800 hover:text-gray-600 transition duration-200 focus:outline-none focus:border-b-4 focus:border-[#060832]"
            >
              Drin's University
            </Link>
            <Link
              to="https://localhost:7057/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-600 transition duration-200 focus:outline-none focus:border-b-4 focus:border-[#060832]"
            >
              Smis
            </Link>
            <Link
              to="/services"
              className="text-gray-800 hover:text-gray-600 transition duration-200 focus:outline-none focus:border-b-4 focus:border-[#060832]"
            >
              Services
            </Link>
            <Link
              to="/about"
              className="text-gray-800 hover:text-gray-600 transition duration-200 focus:outline-none focus:border-b-4 focus:border-[#060832]"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-800 hover:text-gray-600 transition duration-200 focus:outline-none focus:border-b-4 focus:border-[#060832]"
            >
              Contact Us
            </Link>
          </div>

          {/* User Links */}
          <div className="flex items-center space-x-4">
            {authStore.isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-800 hover:text-gray-600 transition duration-200 focus:outline-none focus:border-b-4 focus:border-[#060832]"
                  onClick={closeUserDropdown}
                >
                  Dashboard
                </Link>
                <div className="relative">
                  <button
                    onClick={toggleUserDropdown}
                    className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition duration-200 focus:outline-none focus:border-b-4 focus:border-[#060832]"
                  >
                    <i className="fas fa-user-circle text-2xl"></i>
                    <span className="font-medium">
                      {authStore.user?.username}
                    </span>
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <button
                        onClick={handleLogout}
                        className="block w-full py-2 text-left px-4 text-gray-800 hover:bg-gray-100 transition duration-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="text-gray-800 hover:text-gray-600 transition duration-200 focus:outline-none focus:border-b-4 focus:border-[#060832]"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Add margin to the content below the fixed header to prevent overlap */}
      <div className="mt-[8rem]"></div>
    </>
  );
};

export default observer(Header);
