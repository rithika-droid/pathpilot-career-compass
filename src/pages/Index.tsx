
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Landing from './Landing';

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return <Landing />;
  }

  if (!user.profile?.careerPath) {
    return <Navigate to="/profile-setup" replace />;
  }

  return <Navigate to="/dashboard" replace />;
};

export default Index;
