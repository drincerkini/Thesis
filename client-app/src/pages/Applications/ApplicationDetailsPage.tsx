import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import applicationsStore from "../../stores/applicationsStore";
import { toast } from "react-toastify";

const ApplicationDetailsComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplication = async () => {
      if (id) {
        try {
          await applicationsStore.fetchApplicationById(id);
        } catch (error) {
          toast.error("Failed to fetch application details");
        }
      }
    };

    fetchApplication();
  }, [id]);

  const application = applicationsStore.currentApplication;

  if (applicationsStore.loading || !application) {
    return (
      <div className="text-center mt-6">Loading application details...</div>
    );
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDeleteApplication = async () => {
    if (id) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this application?"
      );
      if (confirmDelete) {
        try {
          await applicationsStore.deleteApplication(id);
          toast.success("Application deleted successfully");
          navigate("/applications");
        } catch (error) {
          toast.error("Failed to delete application");
        }
      }
    }
  };

  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Application Details
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Name:</strong>
          </div>
          <div>{application.name}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Surname:</strong>
          </div>
          <div>{application.surname}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Email:</strong>
          </div>
          <div>{application.email}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Birth Date:</strong>
          </div>
          <div>{new Date(application.birthDate).toLocaleDateString()}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Address:</strong>
          </div>
          <div>{application.address}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Phone Number:</strong>
          </div>
          <div>{application.phoneNumber || "N/A"}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Department:</strong>
          </div>
          <div>{application.department}</div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={handleGoBack}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Go Back
          </button>
          <button
            onClick={handleDeleteApplication}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Delete Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(ApplicationDetailsComponent);
