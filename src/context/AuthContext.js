import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // merged user + profile
  const [loading, setLoading] = useState(true); // global auth loading
  const navigate = useNavigate();

  // Initialize session & fetch profile
  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const currentUser = data.session?.user ?? null;

        if (currentUser) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentUser.id)
            .single();
          const mergedUser = profile ? { ...currentUser, ...profile } : currentUser;
          setUser(mergedUser);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Auth init failed', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();

    // Listen to auth changes
    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      if (currentUser) {
        supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single()
          .then(({ data: profile }) => {
            const mergedUser = profile ? { ...currentUser, ...profile } : currentUser;
            setUser(mergedUser);
          });
      } else {
        setUser(null);
      }
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  // Sign Up
  const signUp = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) return { success: false, error: error.message };
      if (!data.user) return { success: false, error: 'User not found.' };

      // Fetch profile if exists
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      const mergedUser = profile ? { ...data.user, ...profile } : data.user;
      setUser(mergedUser);

      return { success: true, user: mergedUser };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Unexpected error occurred.' };
    } finally {
      setLoading(false);
    }
  };

  // Sign In
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { success: false, error: error.message };
      if (!data.user) return { success: false, error: 'User not found.' };

      // Fetch profile if exists
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      const mergedUser = profile ? { ...data.user, ...profile } : data.user;
      setUser(mergedUser);

      return { success: true, user: mergedUser };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Unexpected error occurred.' };
    } finally {
      setLoading(false);
    }
  };

  // Sign Out
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate('/auth');
    } catch (err) {
      console.error('SignOut failed', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
