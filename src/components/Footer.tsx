import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container px-4">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-foreground">Mounja Natural</span>
          </Link>
          
          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 text-small">
            <Link to="/termos" className="text-muted-foreground hover:text-foreground transition-colors">
              Termos de Uso
            </Link>
            <span className="text-border">|</span>
            <Link to="/privacidade" className="text-muted-foreground hover:text-foreground transition-colors">
              Política de Privacidade
            </Link>
            <span className="text-border">|</span>
            <Link to="/contato" className="text-muted-foreground hover:text-foreground transition-colors">
              Contato
            </Link>
          </nav>
          
          {/* Copyright */}
          <div className="text-center">
            <p className="text-small text-muted-foreground">
              Mounja Natural © 2025 • Todos os direitos reservados
            </p>
            <p className="text-xs text-muted-dark mt-2 max-w-md">
              Este produto não substitui orientação médica. Resultados podem variar de pessoa para pessoa.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
