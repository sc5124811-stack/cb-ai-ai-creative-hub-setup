
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  plan: 'basic' | 'pro' | 'premium' | 'business';
  photoCredits: number;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithOTP: (phone: string) => Promise<void>;
  logout: () => void;
  hasPrivacyConsent: boolean;
  setPrivacyConsent: (consent: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasPrivacyConsent, setHasPrivacyConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cbai-privacy-consent');
    setHasPrivacyConsent(consent === 'true');
    
    const storedUser = localStorage.getItem('cbai-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Placeholder - will integrate with Supabase
    const mockUser: User = {
      id: '1',
      email,
      name: 'Demo User',
      plan: 'basic',
      photoCredits: 3,
    };
    setUser(mockUser);
    localStorage.setItem('cbai-user', JSON.stringify(mockUser));
  };

  const loginWithGoogle = async () => {
    // Placeholder for Google OAuth
    console.log('Google login initiated');
  };

  const loginWithOTP = async (phone: string) => {
    // Placeholder for OTP login
    console.log('OTP sent to:', phone);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cbai-user');
  };

  const setPrivacyConsent = (consent: boolean) => {
    setHasPrivacyConsent(consent);
    localStorage.setItem('cbai-privacy-consent', consent.toString());
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithGoogle,
        loginWithOTP,
        logout,
        hasPrivacyConsent,
        setPrivacyConsent,
      }}
    >
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