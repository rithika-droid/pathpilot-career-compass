
import React, { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import Hero from '../components/Landing/Hero';
import Features from '../components/Landing/Features';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';
import { useAuth } from '../hooks/useAuth';

const Landing = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { user } = useAuth();

  if (user) {
    return null; // Will be handled by main app routing
  }

  const handleShowAuth = (show: boolean, mode: 'login' | 'signup') => {
    setShowAuth(show);
    if (mode) {
      setAuthMode(mode);
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  return (
    <MainLayout onShowAuth={handleShowAuth}>
      {showAuth ? (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-secondary/20">
          {authMode === 'login' ? (
            <LoginForm onToggleMode={toggleAuthMode} />
          ) : (
            <SignupForm onToggleMode={toggleAuthMode} />
          )}
        </div>
      ) : (
        <div className="w-full min-w-full">
          <Hero onShowAuth={handleShowAuth} />
          <Features />
        </div>
      )}
    </MainLayout>
  );
};

export default Landing;
