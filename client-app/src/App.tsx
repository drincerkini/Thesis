import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Department } from "./components/Department";
import { Student } from "./components/Student";
import { Home } from "./components/Home";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/department" element={<Department />} />
          <Route path="/student" element={<Student />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
