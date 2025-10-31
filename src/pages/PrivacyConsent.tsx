
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Camera, Mic, FolderOpen, Wifi } from 'lucide-react';

export default function PrivacyConsent() {
  const [agreed, setAgreed] = useState(false);
  const { setPrivacyConsent } = useAuth();
  const navigate = useNavigate();

  const handleContinue = () => {
    if (agreed) {
      setPrivacyConsent(true);
      navigate('/login');
    }
  };

  const permissions = [
    { icon: Camera, title: 'Camera & Gallery', reason: 'To upload & edit media' },
    { icon: Mic, title: 'Microphone', reason: 'For voiceover in AI video' },
    { icon: FolderOpen, title: 'Storage', reason: 'Save and manage created files' },
    { icon: Wifi, title: 'Internet', reason: 'Connect to AI services securely' },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full border-border/50 bg-card/50 backdrop-blur">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl">Privacy & Security</CardTitle>
          <CardDescription className="text-base">
            We protect your data with end-to-end encryption
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-blue-500" />
              <p className="text-sm font-medium">Your Data is Secure</p>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground ml-8">
              <li>• All data encrypted locally and cloud-side</li>
              <li>• No third-party tracking SDKs</li>
              <li>• User data never shared</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Permissions Required</h3>
            <div className="grid gap-3">
              {permissions.map((perm) => (
                <div key={perm.title} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <perm.icon className="w-5 h-5 text-violet-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">{perm.title}</p>
                    <p className="text-xs text-muted-foreground">{perm.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
            <Checkbox
              id="privacy-agree"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
            />
            <label htmlFor="privacy-agree" className="text-sm cursor-pointer">
              I agree to the{' '}
              <a href="/privacy-policy" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="/terms" className="text-blue-500 hover:underline">
                Terms of Service
              </a>
            </label>
          </div>

          <Button
            onClick={handleContinue}
            disabled={!agreed}
            className="w-full bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
            size="lg"
          >
            Continue to CB Ai
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}