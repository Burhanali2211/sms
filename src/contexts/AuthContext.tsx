import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '@/utils/api/client';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  phone?: string;
  address?: string;
  avatar?: string;
  last_login?: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: any) => Promise<boolean>;
  setUser: (user: User | null) => void; // Add setUser to the interface
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    if (initialized) return;
    
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        apiClient.setToken(token);
        const response = await apiClient.verifyToken(token);
        
        if (response.error) {
          // Token is invalid, clear it
          localStorage.removeItem('authToken');
          apiClient.clearToken();
          setUser(null);
        } else {
          setUser(response.data as User);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      
      localStorage.removeItem('authToken');
      apiClient.clearToken();
      setUser(null);
    } finally {
      setIsLoading(false);
      setInitialized(true);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await apiClient.login(email, password);
      
      if (response.error) {
        toast({
          title: 'Login Failed',
          description: response.error,
          variant: 'destructive',
        });
        return false;
      }

      const { user: userData, token } = response.data as any;
      
      setUser(userData);
      apiClient.setToken(token);
      // Also store token in localStorage for persistence
      localStorage.setItem('authToken', token);
      
      toast({
        title: 'Welcome back!',
        description: `Logged in as ${userData.name}`,
      });
      
      return true;
    } catch (error) {
      
      toast({
        title: 'Login Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await apiClient.register(userData);
      
      if (response.error) {
        toast({
          title: 'Registration Failed',
          description: response.error,
          variant: 'destructive',
        });
        return false;
      }

      toast({
        title: 'Registration Successful',
        description: 'You can now log in with your credentials',
      });
      
      return true;
    } catch (error) {
      
      toast({
        title: 'Registration Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    apiClient.clearToken();
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    setUser // Expose setUser method
  };

  // Don't render children until auth is initialized
  if (!initialized && isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-school-primary mb-4"></div>
        <div className="text-xl font-medium text-gray-700">Loading authentication...</div>
        <p className="text-sm text-muted-foreground mt-2">Please wait while we verify your credentials</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};