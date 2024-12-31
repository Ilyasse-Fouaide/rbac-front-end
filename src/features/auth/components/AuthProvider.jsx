import React, { createContext, useContext } from 'react';
import axiosInstance from '@/api/axios';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used whithin a AuthProvider.');
  }

  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const login = React.useCallback(async (email, password) => {
    const { data } = await axiosInstance.post('/auth/login', {
      email,
      password,
    });

    return data;
  }, []);

  const logout = React.useCallback(async () => {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('accessToken');
      setUser(null);
    }
  }, []);

  const googleButton = React.useCallback(() => {
    window.open(`${import.meta.env.VITE_API_URL}/auth/google`, '_self');
  }, []);

  const checkAuth = React.useCallback(async () => {
    try {
      const { data } = await axiosInstance.get('/profile/me');
      setUser(data);
    } catch (error) {
      console.error('Auth check failed', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const contextValue = React.useMemo(
    () => ({ user, setUser, loading, login, logout, checkAuth, googleButton }),
    [user, setUser, loading, login, logout, checkAuth, googleButton],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
