
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AiChat() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4">
      <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">AI Chat Assistant</h1>
        <p className="text-muted-foreground">Coming soon...</p>
      </div>
    </div>
  );
}