
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { PrivacyGuard } from '@/components/PrivacyGuard';
import SplashScreen from '@/pages/SplashScreen';
import PrivacyConsent from '@/pages/PrivacyConsent';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import PhotoStudio from '@/pages/PhotoStudio';
import VideoStudio from '@/pages/VideoStudio';
import AiChat from '@/pages/AiChat';
import Profile from '@/pages/Profile';
import Subscription from '@/pages/Subscription';
import AdminDashboard from '@/pages/AdminDashboard';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="cbai-theme">
        <AuthProvider>
          <Router>
            <PrivacyGuard>
              <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/privacy-consent" element={<PrivacyConsent />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/photo-studio" element={<PhotoStudio />} />
                <Route path="/video-studio" element={<VideoStudio />} />
                <Route path="/ai-chat" element={<AiChat />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </PrivacyGuard>
          </Router>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;