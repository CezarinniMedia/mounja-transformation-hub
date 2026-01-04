import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, CheckSquare, TrendingUp, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/app', icon: Home, label: 'Início' },
  { path: '/app/metodo', icon: BookOpen, label: 'Método' },
  { path: '/app/checkin', icon: CheckSquare, label: 'Check-in' },
  { path: '/app/historico', icon: TrendingUp, label: 'Progresso' },
  { path: '/app/vip', icon: Star, label: 'VIP' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border/50 safe-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path || 
            (path !== '/app' && location.pathname.startsWith(path));
          
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-2 px-4 transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
