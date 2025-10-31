
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function SplashScreen() {
  const navigate = useNavigate();
  const { hasPrivacyConsent, user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasPrivacyConsent) {
        navigate('/privacy-consent');
      } else if (!user) {
        navigate('/login');
      } else {
        navigate('/dashboard');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [hasPrivacyConsent, user, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 animate-pulse">
        <div className="relative">
          <div className="text-8xl font-bold bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
            CB Ai
          </div>
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-purple-500/20" />
        </div>
        <p className="text-muted-foreground text-lg">Powered by CB Ai</p>
      </div>
    </div>
  );
}