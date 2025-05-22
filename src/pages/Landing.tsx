
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
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

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
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
          <Hero />
          <Features />
        </>
      )}
    </div>
  );
};

export default Landing;
