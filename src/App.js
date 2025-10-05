import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import AlgorithmVisualizer from './pages/AlgorithmVisualizer';
import ProjectLabs from './pages/ProjectLabs';
import CodeDuel from './pages/CodeDuel';
import MLSandbox from './pages/MLSandbox';
import Portfolio from './pages/Portfolio';
import Auth from './pages/Auth';
import SplashScreen from './pages/SplashScreen';
import ProfileBuild from './pages/ProfileBuild';
import OnboardingQuiz from './pages/OnboardingQuiz';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UserProfile from './pages/UserProfile';
import AllNews from './pages/AllNews';



function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Splash screen entry */}
        <Route path="/" element={<SplashScreen />} />

        {/* Auth page */}
        <Route path="/auth" element={<Auth />} />

        {/* Profile build (protected) */}
        <Route
          path="/profile-build"
          element={
            <ProtectedRoute>
              <ProfileBuild />
            </ProtectedRoute>
          }
        />

        {/* Onboarding quiz (protected) */}
        <Route
          path="/onboarding-quiz"
          element={
            <ProtectedRoute>
              <OnboardingQuiz />
            </ProtectedRoute>
          }
        />

        {/* Main app with sidebar layout */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="learn" element={<Learn />} />
          <Route path="visualizer" element={<AlgorithmVisualizer />} />
          <Route path="projects" element={<ProjectLabs />} />
          <Route path="duel" element={<CodeDuel />} />
          <Route path="sandbox" element={<MLSandbox />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="all-news" element={<AllNews />} />
        </Route>

        {/* Redirects to /app/dashboard instead of 404 for logged-in users */}
        <Route path="/dashboard" element={<Navigate to="/app" replace />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;                