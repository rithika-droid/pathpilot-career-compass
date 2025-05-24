
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Landing from './Landing';

const Index = () => {
  const { user, userProfile, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show landing page
  if (!user) {
    return <Landing />;
  }

  // If authenticated but no profile setup, redirect to profile setup
  if (!userProfile?.careerPath) {
    return <Navigate to="/profile-setup" replace />;
  }

  // If everything is set up, redirect to dashboard
  return <Navigate to="/dashboard" replace />;
};

export default Index;
