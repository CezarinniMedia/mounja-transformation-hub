import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function SplashScreen() {
  const navigate = useNavigate();
  const { user, authLoading, profile, profileLoading } = useApp();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 4, 100));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (authLoading || profileLoading) return;
    
    const timer = setTimeout(() => {
      if (!user) {
        navigate('/app/auth');
      } else if (!profile) {
        navigate('/app/bem-vinda');
      } else {
        navigate('/app/dashboard');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [user, profile, authLoading, profileLoading, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Leaf className="w-20 h-20 text-primary animate-pulse" />
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
        </div>
        
        <h1 className="text-2xl font-bold text-foreground">Mounja Natural</h1>
        <p className="text-sm text-muted-foreground">Carregando seu progresso...</p>
      </div>

      <div className="w-48 mt-12">
        <div className="h-1 bg-surface rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-100 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
