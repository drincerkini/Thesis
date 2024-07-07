import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-400 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-xl font-bold">
          <Link to="/">My University</Link>
        </div>
        <nav className="flex space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/department" className="hover:underline">
            Departments
          </Link>
          <Link to="/student" className="hover:underline">
            Students
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
