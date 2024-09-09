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
    <header className="p-4 bg-gray-800 text-white">
      <nav>
        <Link to="/">Home</Link>
        {authStore.isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default observer(Header);
