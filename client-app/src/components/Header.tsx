import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../stores/authStore";
import { useState } from "react"; // Import useState from React

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false); // State to manage user dropdown visibility
  const [showMenuDropdown, setShowMenuDropdown] = useState(false); // State to manage menu dropdown visibility

  const handleLogout = () => {
    authStore.logout();
    navigate("/login");
    setShowDropdown(false); // Close the user dropdown after logout
  };

  const toggleUserDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMenuDropdown = () => {
    setShowMenuDropdown(!showMenuDropdown);
  };

  // Function to close the user dropdown
  const closeUserDropdown = () => {
    setShowDropdown(false);
  };

  // Function to close the menu dropdown
  const closeMenuDropdown = () => {
    setShowMenuDropdown(false);
  };

  return (
    <header className="p-4 bg-white shadow-md border-b border-gray-200">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Home Link */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-2xl font-semibold text-gray-800 hover:text-gray-600 transition duration-200"
            onClick={closeMenuDropdown} // Close dropdown on link click
          >
            Drin's University
          </Link>
          {/* New Dropdown Next to Home */}
          <div className="relative">
            <button
              onClick={toggleMenuDropdown}
              className="text-gray-800 hover:text-gray-600 transition duration-200"
            >
              E-Sherbimet
            </button>
            {showMenuDropdown && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <a
                  href="https://localhost:7057/"
                  target="_blank" // Opens the link in a new tab
                  rel="noopener noreferrer" // Security best practice
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={closeMenuDropdown} // Close dropdown on link click
                >
                  Smis
                </a>
                <Link
                  to="/services"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={closeMenuDropdown} // Close dropdown on link click
                >
                  Services
                </Link>
                <Link
                  to="/about"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={closeMenuDropdown} // Close dropdown on link click
                >
                  About Us
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* User Links */}
        <div className="flex items-center space-x-4">
          {authStore.isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-800 hover:text-gray-600 transition duration-200"
                onClick={closeUserDropdown} // Close dropdown on link click
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
                    {/* Add more dropdown items as needed */}
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="text-gray-800 hover:text-gray-600 transition duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default observer(Header);
