
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  profile?: UserProfile;
  notifications?: Notification[];
}

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
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
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
  updateAvatar: (avatarUrl: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Mock authentication for demo
  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      const mockUser: User = {
        id: '1',
        email,
        username: email.split('@')[0],
        notifications: [
          {
            id: '1',
            title: 'Welcome to PathPilot',
            message: 'Get started by completing your profile',
            date: new Date().toISOString(),
            read: false
          }
        ]
      };
      setUser(mockUser);
      localStorage.setItem('pathpilot_user', JSON.stringify(mockUser));
      return Promise.resolve();
    } catch (error) {
      console.error('Login error:', error);
      return Promise.reject('Invalid email or password');
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    try {
      // Simulate API call
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        username,
        notifications: [
          {
            id: '1',
            title: 'Welcome to PathPilot',
            message: 'Get started by completing your profile',
            date: new Date().toISOString(),
            read: false
          }
        ]
      };
      setUser(mockUser);
      localStorage.setItem('pathpilot_user', JSON.stringify(mockUser));
      return Promise.resolve();
    } catch (error) {
      console.error('Signup error:', error);
      return Promise.reject('Could not create account');
    }
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

  const updateAvatar = (avatarUrl: string) => {
    if (user && user.profile) {
      const updatedProfile = { ...user.profile, avatar: avatarUrl };
      const updatedUser = { ...user, profile: updatedProfile };
      setUser(updatedUser);
      localStorage.setItem('pathpilot_user', JSON.stringify(updatedUser));
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('pathpilot_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error parsing user data from localStorage', e);
        localStorage.removeItem('pathpilot_user');
      }
    }
  }, []);

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    updateAvatar
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
