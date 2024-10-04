import React from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../../stores/authStore";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (!authStore.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default observer(ProtectedRoute);
