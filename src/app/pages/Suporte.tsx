import { MessageCircle } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';

export function Suporte() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/5511999999999?text=Olá! Preciso de ajuda com o Método Mounja Natural.', '_blank');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader title="Suporte" showBack />

      <div className="max-w-lg mx-auto px-6 py-12 text-center">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="w-10 h-10 text-primary" />
        </div>
        
        <h1 className="text-xl font-bold text-foreground mb-2">
          Precisa de ajuda?
        </h1>
        <p className="text-muted-foreground mb-8">
          Nossa equipe está pronta para te atender. Clique no botão abaixo para falar conosco pelo WhatsApp.
        </p>

        <button
          onClick={handleWhatsApp}
          className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground rounded-xl font-semibold"
        >
          <MessageCircle className="w-5 h-5" />
          Falar no WhatsApp
        </button>

        <p className="text-xs text-muted-foreground mt-6">
          Horário de atendimento: Seg-Sex, 9h às 18h
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
