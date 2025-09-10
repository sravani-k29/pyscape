import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for demo mode or missing Supabase credentials
    const isDemoMode = !process.env.REACT_APP_SUPABASE_URL || 
                        process.env.REACT_APP_SUPABASE_URL.includes('placeholder') || 
                        process.env.REACT_APP_DEMO_MODE === 'true';
    
    if (isDemoMode) {
      console.warn('Running in demo mode with simulated authentication.');
      
      // Try to load demo user from localStorage first
      try {
        const savedUser = localStorage.getItem('pyscapeDemoUser');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          console.log('Restored demo user from localStorage');
        } else {
          // Create a new demo user if none exists
          setUser({ 
            id: 'demo-user-id', 
            email: 'demo@pyscape.com',
            name: 'Demo User',
            user_metadata: {
              full_name: 'Demo User',
              xp_points: 1250,
              streak_days: 5,
              badges: 3
            }
          });
        }
      } catch (error) {
        console.error('Error loading demo user:', error);
        // Fallback to basic demo user
        setUser({ id: 'demo-user-id', email: 'demo@pyscape.com' });
      }
      
      setLoading(false);
      return;
    }

    // Normal Supabase authentication flow
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data?.session?.user || null);
      } catch (error) {
        console.error('Error checking auth session:', error);
        setUser(null);
      }
      setLoading(false);
    };

    checkSession();

    // Listen for changes on auth state
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user || null);
          setLoading(false);
        }
      );
      
      return () => {
        subscription?.unsubscribe?.();
      };
    } catch (error) {
      console.error('Error setting up auth listener:', error);
      setLoading(false);
    }
  }, []);

  // Sign up with email and password
  const signUp = async (email, password) => {
    // Demo mode - simulate successful signup
    if (!process.env.REACT_APP_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL.includes('placeholder')) {
      console.log('Demo mode: Simulating successful signup');
      // Simulate successful signup in demo mode
      setUser({ id: 'demo-user-id', email: email || 'demo@pyscape.com', name: 'Demo User' });
      return { success: true };
    }

    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  };

  // Sign in with email and password
  const signIn = async (email, password) => {
    // Demo mode - simulate successful login
    if (!process.env.REACT_APP_SUPABASE_URL || 
        process.env.REACT_APP_SUPABASE_URL.includes('placeholder') ||
        process.env.REACT_APP_DEMO_MODE === 'true') {
      console.log('Demo mode: Simulating successful login');
      
      // Create a demo user with some predefined data
      const demoUser = { 
        id: 'demo-user-id', 
        email: email || 'demo@pyscape.com', 
        name: 'Demo User',
        user_metadata: {
          full_name: 'Demo User',
          xp_points: 1250,
          streak_days: 5,
          badges: 3
        }
      };
      
      // Store user in state
      setUser(demoUser);
      
      // Also store in localStorage to persist across refreshes
      try {
        localStorage.setItem('pyscapeDemoUser', JSON.stringify(demoUser));
      } catch (err) {
        console.warn('Failed to store demo user in localStorage', err);
      }
      
      return { success: true };
    }

    try {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      // Update user state with the authenticated user
      if (data?.user) {
        setUser(data.user);
      }
      return { success: true };
    } catch (error) {
      console.error('Signin error:', error);
      return { success: false, error: error.message };
    }
  };

  // Sign out
  const signOut = async () => {
    // Demo mode - simulate successful logout
    if (!process.env.REACT_APP_SUPABASE_URL || 
        process.env.REACT_APP_SUPABASE_URL.includes('placeholder') || 
        process.env.REACT_APP_DEMO_MODE === 'true') {
      console.log('Demo mode: Simulating successful logout');
      
      // Clear user from state
      setUser(null);
      
      // Remove from localStorage
      try {
        localStorage.removeItem('pyscapeDemoUser');
      } catch (err) {
        console.warn('Failed to remove demo user from localStorage', err);
      }
      
      return { success: true };
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Signout error:', error);
      // Even if there's an error, we'll still clear the user from state
      setUser(null);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
