import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../../stores/authStore";
import { useState } from "react";

// Importing images
import drinLogo from "../../assets/img/drinLogo.jpg";
import EsherbimetDropdownComponent from "./EsherbimetDropdownComponent";
import ApplySectionComponent from "./ApplySectionComponent";

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

  return (
    <>
      <ApplySectionComponent />

      {/* Sticky Header */}
      <header className="sticky top-0 p-4 bg-white shadow-md border-b border-gray-200 z-40">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img
                src={drinLogo}
                alt="University Logo"
                className="h-20 w-20 rounded-full"
              />
            </Link>
            <Link
              to="/"
              className="text-gray-800 hover:text-gray-600 transition duration-200"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="text-gray-800 hover:text-gray-600 transition duration-200"
            >
              Services
            </Link>
            <Link
              to="/about"
              className="text-gray-800 hover:text-gray-600 transition duration-200"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-800 hover:text-gray-600 transition duration-200"
            >
              Contact Us
            </Link>
          </div>

          {/* User Links */}
          <div className="flex items-center space-x-2">
            <EsherbimetDropdownComponent />

            {authStore.isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-800 hover:text-gray-600 transition duration-200"
                >
                  Dashboard
                </Link>
                <div className="relative">
                  <button
                    onClick={toggleUserDropdown}
                    className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition duration-200"
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
                        className="block w-full py-2 text-left px-4 text-gray-800 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </nav>
      </header>

      <div className="mt-8"></div>
    </>
  );
};

export default observer(Header);
