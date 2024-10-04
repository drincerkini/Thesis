import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/HeaderFooter/Header";
import Footer from "./components/HeaderFooter/Footer";
import ProtectedRoute from "./components/others/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import authStore from "./stores/authStore";
import Spinner from "./components/others/Spinner";
import { AboutPage } from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ServicesPage from "./pages/ServicesPage";
import DashboardPage from "./pages/DashboardPage";
import AddNewsPage from "./pages/News/AddNewsPage";
import NewsDetailPage from "./pages/News/NewsDetailPage";
import ContactUsPage from "./pages/Contacts/ContactUsPage";
import ApplicationPage from "./pages/Applications/ApplicationPage";
import ContactDetailsPage from "./pages/Contacts/ContactDetailsPage";
import ContactListPage from "./pages/Contacts/ContactListPage";
import ApplicationListPage from "./pages/Applications/ApplicationListPage";
import ApplicationDetailsPage from "./pages/Applications/ApplicationDetailsPage";
import ActivitiesPage from "./pages/Activities/ActivitiesPage";

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
        <Spinner />
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-news" element={<AddNewsPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/contact-list" element={<ContactListPage />} />
            <Route path="/contact/:id" element={<ContactDetailsPage />} />
            <Route path="/application" element={<ApplicationPage />} />
            <Route path="/application-list" element={<ApplicationListPage />} />
            <Route path="/activity-list" element={<ActivitiesPage />} />
            <Route
              path="/application/:id"
              element={<ApplicationDetailsPage />}
            />

            {/* Protect the dashboard route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
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
