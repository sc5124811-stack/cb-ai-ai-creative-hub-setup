
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function PrivacyGuard({ children }: { children: React.ReactNode }) {
  const { hasPrivacyConsent, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    const publicPaths = ['/', '/privacy-consent', '/privacy-policy', '/terms'];
    const isPublicPath = publicPaths.includes(location.pathname);

    if (!hasPrivacyConsent && !isPublicPath) {
      navigate('/privacy-consent');
    } else if (hasPrivacyConsent && !user && location.pathname !== '/login' && !isPublicPath) {
      navigate('/login');
    }
  }, [hasPrivacyConsent, user, loading, location.pathname, navigate]);

  return <>{children}</>;
}