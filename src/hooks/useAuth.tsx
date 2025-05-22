
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  profile?: UserProfile;
}

interface UserProfile {
  subject: string;
  year: string;
  branch: string;
  financialStatus: string;
  abroadPlans: string;
  purpose: string;
  careerPath?: string;
  level?: number;
  points?: number;
  badges?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Mock authentication for demo
  const login = async (email: string, password: string) => {
    // Simulate API call
    const mockUser: User = {
      id: '1',
      email,
      username: email.split('@')[0],
    };
    setUser(mockUser);
    localStorage.setItem('pathpilot_user', JSON.stringify(mockUser));
  };

  const signup = async (email: string, password: string, username: string) => {
    // Simulate API call
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      username,
    };
    setUser(mockUser);
    localStorage.setItem('pathpilot_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pathpilot_user');
  };

  const updateProfile = (profile: UserProfile) => {
    if (user) {
      const updatedUser = { ...user, profile };
      setUser(updatedUser);
      localStorage.setItem('pathpilot_user', JSON.stringify(updatedUser));
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('pathpilot_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
