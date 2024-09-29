import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import authStore from "./stores/authStore";
import AddNews from "./components/AddNews";
import NewsDetail from "./components/NewsDetail";
import Spinner from "./components/Spinner"; // Import Spinner component
import Services from "./components/Services";
import { AboutPage } from "./components/AboutPage";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate a 1-second loading delay
    const loadApp = async () => {
      await authStore.loadUserFromToken(); // Load user from token
      setTimeout(() => {
        setLoading(false); // Hide spinner after 1 second
      }, 1000);
    };

    loadApp();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner /> {/* Display the spinner while loading */}
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-news" element={<AddNews />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<AboutPage />} />
            {/* Protect the dashboard route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <ToastContainer />
        <Footer />
      </div>
    </Router>
  );
};

export default observer(App);
