
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Image, Video, MessageSquare, User, CreditCard, LogOut, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const tools = [
    {
      icon: Image,
      title: 'AI Photo Studio',
      description: 'Edit & generate stunning photos with AI',
      gradient: 'from-pink-500 to-rose-500',
      path: '/photo-studio',
      credits: user?.photoCredits,
    },
    {
      icon: Video,
      title: 'AI Video Studio',
      description: 'Create & enhance videos with AI magic',
      gradient: 'from-blue-500 to-cyan-500',
      path: '/video-studio',
      locked: user?.plan === 'basic',
    },
    {
      icon: MessageSquare,
      title: 'AI Chat Assistant',
      description: 'Your creative AI companion',
      gradient: 'from-violet-500 to-purple-500',
      path: '/ai-chat',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
            CB Ai
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/profile')}>
              <User className="w-4 h-4 mr-2" />
              {user?.name}
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=600&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-violet-500" />
            <span className="text-sm text-violet-500 font-medium">
              {user?.plan.toUpperCase()} Plan
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
            Welcome to CB Ai
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered creative hub for photos, videos, and intelligent assistance
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {tools.map((tool) => (
            <Card
              key={tool.title}
              className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur hover:border-border transition-all cursor-pointer group"
              onClick={() => !tool.locked && navigate(tool.path)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="flex items-center justify-between">
                  {tool.title}
                  {tool.locked && (
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      Pro+
                    </span>
                  )}
                </CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              {tool.credits !== undefined && (
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {tool.credits} credits remaining today
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Upgrade CTA */}
        {user?.plan === 'basic' && (
          <Card className="border-violet-500/50 bg-gradient-to-br from-violet-500/10 to-purple-500/10">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <h3 className="font-semibold text-lg mb-1">Unlock Premium Features</h3>
                <p className="text-sm text-muted-foreground">
                  Get unlimited access to all AI tools, HD exports, and more
                </p>
              </div>
              <Button
                onClick={() => navigate('/subscription')}
                className="bg-gradient-to-r from-violet-500 to-purple-500"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}