import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/department">Department Page</Link>
          </li>
          <li>
            <Link to="/student">Student Page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
