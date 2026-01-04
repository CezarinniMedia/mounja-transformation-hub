import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  showSettings?: boolean;
  rightElement?: React.ReactNode;
  className?: string;
}

export function AppHeader({ 
  title, 
  showBack = false, 
  showSettings = false,
  rightElement,
  className 
}: AppHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className={cn(
      "sticky top-0 z-40 bg-background border-b border-border/50 px-6 py-4",
      className
    )}>
      <div className="max-w-lg mx-auto flex items-center justify-between">
        {showBack ? (
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        ) : (
          <div className="w-10" />
        )}

        {title && (
          <h1 className="text-lg font-bold text-foreground">
            {title}
          </h1>
        )}

        {showSettings ? (
          <button
            onClick={() => navigate('/app/perfil')}
            className="p-2 -mr-2 text-foreground hover:text-primary transition-colors"
          >
            <Settings className="w-6 h-6" />
          </button>
        ) : rightElement ? (
          rightElement
        ) : (
          <div className="w-10" />
        )}
      </div>
    </header>
  );
}
