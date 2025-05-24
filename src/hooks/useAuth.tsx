
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

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
  loading: boolean;
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AuthProvider: Setting up auth state listener');
    
    // Check for existing session token in localStorage
    const savedSession = localStorage.getItem('pathpilot_session');
    if (savedSession) {
      try {
        const sessionData = JSON.parse(savedSession);
        if (sessionData.expires_at && new Date(sessionData.expires_at) > new Date()) {
          // Create a mock user for local session
          const mockUser = {
            id: sessionData.user_id,
            email: sessionData.email,
            user_metadata: { full_name: sessionData.username }
          } as User;
          
          setUser(mockUser);
          setSession(sessionData as Session);
          
          // Load user profile
          const savedUserProfile = localStorage.getItem('pathpilot_user_profile');
          if (savedUserProfile) {
            setUserProfile(JSON.parse(savedUserProfile));
          }
          
          setLoading(false);
          return;
        } else {
          localStorage.removeItem('pathpilot_session');
        }
      } catch (e) {
        console.error('Error parsing saved session', e);
        localStorage.removeItem('pathpilot_session');
      }
    }
    
    // Set up auth state listener for Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log('User authenticated via Supabase');
          
          // Save session to localStorage
          localStorage.setItem('pathpilot_session', JSON.stringify({
            ...session,
            user_id: session.user.id,
            email: session.user.email,
            username: session.user.user_metadata?.full_name || session.user.email?.split('@')[0]
          }));
          
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
              const savedUserProfile = localStorage.getItem('pathpilot_user_profile');
              if (savedUserProfile) {
                try {
                  const parsedProfile = JSON.parse(savedUserProfile);
                  setUserProfile(parsedProfile);
                } catch (e) {
                  console.error('Error parsing user profile from localStorage', e);
                }
              }
              
            } catch (error) {
              console.error('Error fetching profile:', error);
            } finally {
              setLoading(false);
            }
          }, 0);
        } else {
          setProfile(null);
          setUserProfile(null);
          localStorage.removeItem('pathpilot_session');
          setLoading(false);
        }
      }
    );

    // Check for existing Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email);
      if (!session) {
        setLoading(false);
      }
    });

    return () => {
      console.log('AuthProvider: Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    console.log('Attempting login for:', email);
    setLoading(true);
    
    try {
      // For demo purposes, allow any email/password combination
      if (email && password) {
        // Create a mock session for local development
        const mockUser = {
          id: `user-${Date.now()}`,
          email: email,
          user_metadata: { full_name: email.split('@')[0] }
        } as User;
        
        const mockSession = {
          access_token: 'mock-token',
          refresh_token: 'mock-refresh',
          expires_at: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
          user: mockUser,
          user_id: mockUser.id,
          username: email.split('@')[0]
        } as Session;
        
        // Save to localStorage
        localStorage.setItem('pathpilot_session', JSON.stringify(mockSession));
        
        setUser(mockUser);
        setSession(mockSession);
        
        console.log('Mock login successful for:', email);
        return;
      }
      
      // Fallback to Supabase auth if configured
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Supabase login error:', error);
        throw new Error(error.message);
      }
      
    } catch (error: any) {
      setLoading(false);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    console.log('Attempting Google login');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    
    if (error) {
      console.error('Google login error:', error);
      throw new Error(error.message);
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    console.log('Attempting signup for:', email);
    
    // For demo purposes, just log them in immediately
    await login(email, password);
  };

  const logout = async () => {
    console.log('Logging out user');
    setLoading(true);
    
    try {
      // Clear local storage
      localStorage.removeItem('pathpilot_session');
      localStorage.removeItem('pathpilot_user_profile');
      
      // Try Supabase logout
      await supabase.auth.signOut();
      
      // Clear all state
      setUser(null);
      setSession(null);
      setProfile(null);
      setUserProfile(null);
      
      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    // Save to localStorage
    localStorage.setItem('pathpilot_user_profile', JSON.stringify(profile));
    
    // Also update the legacy format for backward compatibility
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
    loading,
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
