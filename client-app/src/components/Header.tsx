import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); // Perform any necessary cleanup on the server
      logout(); // Clear the user from context
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">My App</h1>
      <nav>
        <Link to="/" className="mr-4">
          Home
        </Link>
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.email}!</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/register" className="mr-4">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
