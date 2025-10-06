import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { useProfile } from '../hooks/useAuth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: profile, isLoading: profileLoading, error: profileError } = useProfile();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (!authenticated) {
        setUser(null);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!profileLoading) {
      if (profile && !profileError) {
        setUser(profile);
        setIsAuthenticated(true);
      } else if (profileError) {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    }
  }, [profile, profileLoading, profileError]);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};