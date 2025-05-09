import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';

// Define the shape of the user object
interface User {
  id: string;
  email: string;
  name: string;
}

// Define the shape of the auth context
interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  signIn: (userData: User) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoading: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  error: null,
});

// Export a hook that will be used to access the context
export const useAuth = () => useContext(AuthContext);

// Define the provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const segments = useSegments();

  // Check if the user is authenticated on initial load
  useEffect(() => {
    // Simulate checking for stored authentication token
    const checkAuthStatus = async () => {
      try {
        // In a real app, you would check for a stored token here
        const storedUser = null; // For now, always start as logged out
        
        setUser(storedUser);
        setIsLoading(false);
      } catch (e) {
        console.error('Failed to check auth status:', e);
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  // Monitor the segments and redirect user when auth state changes
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'auth';
    
    if (!user && !inAuthGroup) {
      // If user is not authenticated and not in the auth group, redirect to login
      router.replace('/auth/login');
    } else if (user && inAuthGroup) {
      // If user is authenticated and in auth group, redirect to home
      router.replace('/(tabs)');
    }
  }, [user, segments, isLoading]);

  // Sign in function
  const signIn = async (userData: User) => {
    setUser(userData);
  };

  // Sign up function
  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate an API call to register the user
      // In a real app, this would be a call to your Spring Boot backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just simulate a successful registration
      // In a real app, you would now proceed to sign in the user
      
      // The user registration is successful, but we're not automatically signing them in
      // They will be redirected to the login screen to sign in
    } catch (e) {
      console.error('Failed to sign up:', e);
      setError('Failed to sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    setIsLoading(true);
    
    try {
      // Simulate an API call to sign out
      // In a real app, this would involve clearing stored tokens
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear the user state
      setUser(null);
    } catch (e) {
      console.error('Failed to sign out:', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, error }}>
      {children}
    </AuthContext.Provider>
  );
}