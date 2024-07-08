import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Department } from "./components/department/Department";
import { Student } from "./components/student/Student";
import { Home } from "./components/Home";
import Layout from "./components/Layout";
import Register from "./components/Register";
import Login from "./components/Login";
import { CreateStudent } from "./components/student/CreateStudent";
import { ToastContainer } from "react-toastify";
import DepartmentDetails from "./components/department/DepartmentDetails";
import { CreateDepartment } from "./components/department/CreateDepartment";
import StudentDetails from "./components/student/StudentDetails";

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
          <Route path="/department/:id" element={<DepartmentDetails />} />
          <Route path="/student/:id" element={<StudentDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
