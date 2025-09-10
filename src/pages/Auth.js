import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Demo mode - always succeed and redirect to dashboard
      if (!process.env.REACT_APP_SUPABASE_URL || 
          process.env.REACT_APP_SUPABASE_URL.includes('placeholder') || 
          process.env.REACT_APP_DEMO_MODE === 'true') {
        console.log('Running in demo mode - bypassing authentication');
        
        // In demo mode, always redirect to dashboard after a slight delay
        if (isLogin) {
          await signIn(email || 'demo@pyscape.com', password || 'demopassword');
        } else {
          await signUp(email || 'demo@pyscape.com', password || 'demopassword');
        }
        
        setTimeout(() => {
          navigate('/');
        }, 800);
        return;
      }

      // Normal authentication flow
      if (isLogin) {
        const { success, error } = await signIn(email, password);
        if (success) {
          navigate('/');
        } else {
          setError(error || 'Failed to sign in. Please check your credentials.');
        }
      } else {
        const { success, error } = await signUp(email, password);
        if (success) {
          // Show confirmation message
          setError('Please check your email to confirm your registration.');
          setIsLogin(true);
        } else {
          setError(error || 'Failed to create account. Please try again.');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError('An error occurred. Please try again or use demo mode.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-dark-lighter rounded-lg shadow-xl overflow-hidden"
      >
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Pyscape</h1>
            <p className="text-gray-400">Your adaptive learning journey starts here</p>
          </div>
          
          <h2 className="text-xl font-semibold mb-6">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-sm text-red-200">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="input w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="input w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : null}
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              onClick={async () => {
                setLoading(true);
                try {
                  // Create a demo user in the auth context
                  await signIn('demo@pyscape.com', 'demopassword');
                  
                  // Redirect to dashboard
                  navigate('/');
                } catch (err) {
                  console.error('Demo mode error:', err);
                  setError('Failed to enter demo mode. Please try again.');
                  setLoading(false);
                }
              }}
              className="btn-secondary w-full py-2 mt-2"
              disabled={loading}
            >
              Continue in Demo Mode →
            </button>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            {' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-primary-light"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-dark-lightest text-center text-xs text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
