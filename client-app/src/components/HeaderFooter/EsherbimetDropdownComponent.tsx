import outlook from "../../assets/outlook.png";
import ubtImage from "../../assets/ubt.png";
import moodleImage from "../../assets/moodle.png";
import { useState } from "react";
import authStore from "../../stores/authStore";
import { Link } from "react-router-dom";

const EsherbimetDropdownComponent = () => {
  const [showEservicesDropdown, setShowEservicesDropdown] = useState(false);

  const toggleEservicesDropdown = () => {
    setShowEservicesDropdown(!showEservicesDropdown);
  };

  const closeEservicesDropdown = () => {
    setShowEservicesDropdown(false);
  };

  return (
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
              <img src={outlook} alt="Mail" className="w-8 h-8 rounded-full" />
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
              <img src={ubtImage} alt="SMIS" className="w-8 h-8 rounded-full" />
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
            <span className="text-gray-800 text-lg font-bold">Staff</span>
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
  );
};

export default EsherbimetDropdownComponent;
