import { Users, Check, Bell } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

export function Comunidade() {
  const [notificar, setNotificar] = useState(true);

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader title="Comunidade Mounja" showBack />

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Hero */}
        <div className="bg-gradient-to-br from-warning/20 to-warning/5 rounded-2xl p-8 text-center">
          <Users className="w-20 h-20 text-warning mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Você não está sozinha nessa jornada!
          </h1>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">
          Em breve você terá acesso ao nosso grupo exclusivo no WhatsApp com mais de <span className="text-foreground font-semibold">47.000 mulheres</span> que estão transformando seus corpos com o Método Piscina de Ácido.
        </p>

        {/* What you'll find */}
        <div className="bg-surface rounded-2xl p-5">
          <h3 className="font-bold text-foreground mb-4">O que você vai encontrar</h3>
          <div className="space-y-3">
            {[
              'Troca de experiências com outras mulheres',
              'Dicas diárias da Dra. Alessandra',
              'Fotos de antes e depois para se inspirar',
              'Respostas rápidas para suas dúvidas',
              'Motivação nos dias difíceis',
              'Celebração das suas conquistas',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Card */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5">
          <div className="flex items-center gap-4">
            <Bell className="w-8 h-8 text-primary flex-shrink-0" />
            <div className="flex-1">
              <p className="text-foreground font-medium mb-1">Quer ser avisada assim que liberar?</p>
              <p className="text-xs text-muted-foreground">Vamos te mandar uma notificação</p>
            </div>
            <Switch
              checked={notificar}
              onCheckedChange={setNotificar}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>

        {/* Coming Soon */}
        <div className="text-center py-6">
          <span className="px-4 py-2 bg-warning/20 text-warning rounded-full text-sm font-medium animate-pulse">
            🔓 Lançamento em breve
          </span>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
