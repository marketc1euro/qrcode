import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

// Types for our users
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'client';
  name?: string;
  profilePicture?: string;
  qrCode?: string;
  customLink?: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isClient: boolean;
  addUserAccount: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for saved token and user on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('currentUser');
    
    if (token && savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      // Verify token validity
      fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Invalid token');
        }
        return res.json();
      })
      .then(user => {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
      .catch(() => {
        // If token is invalid, clear everything
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to login');
      }

      const { user, token } = await response.json();
      
      // Save token and user
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
      
      toast({
        title: 'Connexion réussie',
        description: `Bienvenue, ${user.name || user.email}!`,
      });
      
      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/client/dashboard');
      }
    } catch (error) {
      toast({
        title: 'Échec de connexion',
        description: error instanceof Error ? error.message : 'Une erreur inconnue est survenue',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    toast({
      title: 'Déconnexion',
      description: 'Vous avez été déconnecté avec succès.',
    });
    navigate('/login');
  };

  const addUserAccount = async (userData: Omit<User, 'id'> & { password: string }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create user');
      }

      const newUser = await response.json();
      return newUser;
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Échec de la création du compte',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const isAdmin = currentUser?.role === 'admin';
  const isClient = currentUser?.role === 'client';

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      login,
      logout,
      isAdmin,
      isClient,
      addUserAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
