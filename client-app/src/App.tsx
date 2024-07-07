import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Department } from "./components/Department";
import { Student } from "./components/Student";
import { Home } from "./components/Home";
import { CreateDepartment } from "./components/CreateDepartment";
import Layout from "./components/Layout";
import Register from "./components/Register";
import Login from "./components/Login";
import { CreateStudent } from "./components/CreateStudent";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/department" element={<Department />} />
          <Route path="/student" element={<Student />} />
          <Route path="/create-student" element={<CreateStudent />} />
          <Route path="/create-department" element={<CreateDepartment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
