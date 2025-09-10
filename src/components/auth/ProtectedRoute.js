import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);
  const [demoUser, setDemoUser] = useState(null);
  
  // Check for a demo user in localStorage on component mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('pyscapeDemoUser');
      if (savedUser) {
        setDemoUser(JSON.parse(savedUser));
      }
      setHasCheckedStorage(true);
    } catch (error) {
      console.error('Error checking for demo user:', error);
      setHasCheckedStorage(true);
    }
  }, []);
  
  // Show loading spinner while authentication state is being determined
  if (loading || !hasCheckedStorage) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Redirect to auth page if not authenticated (and no demo user exists)
  if (!user && !demoUser) {
    return <Navigate to="/auth" replace />;
  }
  
  // User is authenticated or demo user exists, render the protected content
  return children;
};

export default ProtectedRoute;
