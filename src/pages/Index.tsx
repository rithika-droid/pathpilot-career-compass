
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Landing from './Landing';
import Dashboard from '../components/Dashboard/Dashboard';
import ProfileSetupForm from '../components/ProfileSetup/ProfileSetupForm';
import { ThemeProvider } from '../components/ThemeProvider';
import { AuthProvider } from '../hooks/useAuth';

const Index = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
};

const AppContent = () => {
  const { user } = useAuth();

  if (!user) {
    return <Landing />;
  }

  if (!user.profile?.careerPath) {
    return <ProfileSetupForm />;
  }

  return <Dashboard />;
};

export default Index;
