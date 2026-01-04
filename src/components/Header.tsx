import { Leaf, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-14 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20">
            <Leaf className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-foreground text-lg">Mounja Natural</span>
        </Link>
        
        <div className="flex items-center gap-1.5 text-small text-muted-foreground">
          <Lock className="w-4 h-4" />
          <span>Site Seguro</span>
        </div>
      </div>
    </header>
  );
}
