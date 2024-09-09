import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../stores/authStore"; // Import the authStore

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.logout();
    navigate("/login");
  };

  return (
    <header className="p-4 bg-white shadow-md border-b border-gray-200">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-semibold text-gray-800">
          <Link to="/" className="hover:text-gray-600 transition duration-200">
            Home
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {authStore.isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-800 hover:text-gray-600 transition duration-200"
              >
                Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <i className="fas fa-user-circle text-2xl text-gray-800"></i>
                </div>
                <span className="text-gray-800 font-medium">
                  {authStore.user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300"
                >
                  Logout
                </button>
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
