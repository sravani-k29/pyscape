import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400"></div>
        <span className="ml-4">Loading...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!user.profile_complete && location.pathname !== "/profile-build") {
    return <Navigate to="/profile-build" replace />;
  }

  if (user.profile_complete && !user.onboarding_completed && location.pathname !== "/onboarding-quiz") {
    return <Navigate to="/onboarding-quiz" replace />;
  }

  return children;
};

export default ProtectedRoute;
