
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

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

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
  updateUserProfile: (updates: Partial<Profile>) => Promise<void>;
  updateAvatar: (avatarUrl: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile from database
          setTimeout(async () => {
            try {
              const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              
              if (profileData) {
                setProfile(profileData);
              }
              
              // Load legacy profile from localStorage if exists
              const savedUser = localStorage.getItem('pathpilot_user');
              if (savedUser) {
                try {
                  const parsedUser = JSON.parse(savedUser);
                  if (parsedUser.profile) {
                    setUserProfile(parsedUser.profile);
                  }
                } catch (e) {
                  console.error('Error parsing user data from localStorage', e);
                }
              }
            } catch (error) {
              console.error('Error fetching profile:', error);
            }
          }, 0);
        } else {
          setProfile(null);
          setUserProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      throw new Error(error.message);
    }
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    
    if (error) {
      throw new Error(error.message);
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: username,
        }
      }
    });
    
    if (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('pathpilot_user');
  };

  const updateProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    // Also update localStorage for backward compatibility
    if (user) {
      const userData = {
        id: user.id,
        email: user.email,
        username: user.user_metadata?.full_name || user.email?.split('@')[0],
        profile
      };
      localStorage.setItem('pathpilot_user', JSON.stringify(userData));
    }
  };

  const updateUserProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      setProfile(data);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const updateAvatar = (avatarUrl: string) => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, avatar: avatarUrl };
      updateProfile(updatedProfile);
    }
  };

  const value = {
    user,
    session,
    profile,
    userProfile,
    login,
    loginWithGoogle,
    signup,
    logout,
    updateProfile,
    updateUserProfile,
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
