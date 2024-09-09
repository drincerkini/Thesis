import React from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../stores/authStore"; // Import authStore for authentication check

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (!authStore.isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }
  return <>{children}</>; // Render protected component if authenticated
};

export default observer(ProtectedRoute);
