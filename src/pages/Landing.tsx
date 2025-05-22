
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Landing/Hero';
import Features from '../components/Landing/Features';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../integrations/supabase/client';

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
    <div className="min-h-screen">
      <Navbar onShowAuth={handleShowAuth} />
      
      {showAuth ? (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-secondary/20">
          {authMode === 'login' ? (
            <LoginForm onToggleMode={toggleAuthMode} />
          ) : (
            <SignupForm onToggleMode={toggleAuthMode} />
          )}
        </div>
      ) : (
        <>
          <Hero onShowAuth={handleShowAuth} />
          <Features />
        </>
      )}
    </div>
  );
};

export default Landing;
