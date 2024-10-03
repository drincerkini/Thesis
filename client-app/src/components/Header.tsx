import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../stores/authStore";
import { useState } from "react";

import gmailImage from "../assets/img/gmail.png";
import ubtImage from "../assets/img/ubt.png";
import moodleImage from "../assets/img/moodle.png";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEservicesDropdown, setShowEservicesDropdown] = useState(false);

  const handleLogout = () => {
    authStore.logout();
    navigate("/login");
    setShowDropdown(false);
  };

  const toggleUserDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleEservicesDropdown = () => {
    setShowEservicesDropdown(!showEservicesDropdown);
  };

  const closeEservicesDropdown = () => {
    setShowEservicesDropdown(false);
  };

  return (
    <>
      {/* Fixed Top Section */}
      <section
        className="navbar navbar-expand-lg p-2 w-full fixed top-0 left-0 z-50"
        style={{ backgroundColor: "#060832" }}
      >
        <div className="container flex items-center justify-center space-x-4">
          <h3 className="text-white mr-40">VITI AKADEMIK 2024/2025</h3>
          <Link
            to="/application"
            className="nav-item nav-link bg-white text-black-600 px-4 py-2 rounded shadow hover:bg-gray-100"
          >
            APLIKO TANI
          </Link>
        </div>
      </section>

      <header className="p-4 bg-white shadow-md border-b border-gray-200 fixed w-full top-[3rem] z-40">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-2xl font-semibold text-gray-800 hover:text-gray-600 transition duration-200"
            >
              Drin's University
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
            {/* E-Shërbimet Dropdown */}
            <div className="relative">
              <button
                className="nav-link dropdown-toggle fs-4 text-gray-800 hover:text-gray-600 transition duration-200"
                onClick={toggleEservicesDropdown}
                aria-expanded={showEservicesDropdown}
              >
                E-Shërbimet
              </button>
              {showEservicesDropdown && (
                <ul className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <li>
                    <a
                      className="dropdown-item flex items-center p-2 hover:bg-gray-100"
                      href="https://mail.google.com/mail/u/0/#inbox"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeEservicesDropdown}
                    >
                      <img
                        src={gmailImage}
                        alt="Mail"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="ml-2">Mail</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item flex items-center p-2 hover:bg-gray-100"
                      href="https://localhost:7057"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeEservicesDropdown}
                    >
                      <img
                        src={ubtImage}
                        alt="SMIS"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="ml-2">SMIS</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item flex items-center p-2 hover:bg-gray-100"
                      href="https://moodle.ubt-uni.net/login/index.php"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeEservicesDropdown}
                    >
                      <img
                        src={moodleImage}
                        alt="Moodle"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="ml-2">Moodle</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item flex items-center p-2 hover:bg-gray-100"
                      href="https://branch.ubt-uni.net/TV/ScheduleIndex.aspx"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeEservicesDropdown}
                    >
                      <img
                        src={ubtImage}
                        alt="Student (Grupet, Orari)"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="ml-2">Student (Grupet, Orari)</span>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="my-2 ml-12">
                    <span className="text-gray-800 text-lg">Staff</span>
                  </li>
                  <li>
                    {authStore.isAuthenticated ? (
                      <div className="dropdown-item flex items-center p-2 hover:bg-gray-100">
                        <i className="fas fa-user-circle mr-2"></i>
                        <span>{authStore.user?.username}</span>
                      </div>
                    ) : (
                      <Link
                        className="dropdown-item flex items-center p-2 hover:bg-gray-100"
                        to="/login"
                        onClick={closeEservicesDropdown}
                      >
                        <i className="fas fa-sign-in-alt mr-2"></i>
                        <span>Login</span>
                      </Link>
                    )}
                  </li>
                </ul>
              )}
            </div>

            {/* Additional User Links */}
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

      <div className="mt-[8rem]"></div>
    </>
  );
};

export default observer(Header);
