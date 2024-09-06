import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      toast.success("Logged out successfully!");
      navigate("/login"); // Redirect to login or home page
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  };

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
          {user ? (
            <li className="flex items-center space-x-2">
              <span className="text-gray-700">Hello, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-blue-600">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-600">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
