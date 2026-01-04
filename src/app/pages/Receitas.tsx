import { useNavigate } from 'react-router-dom';
import { Clock, DollarSign, Star } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';

export function Receitas() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader title="Receitas do Método" showBack />

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        <p className="text-muted-foreground">Passo a passo completo</p>

        {/* Recipe 1 - Main */}
        <div className="bg-surface rounded-2xl overflow-hidden">
          <div className="h-32 bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
            <span className="text-6xl">🍵</span>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-warning/20 text-warning text-xs font-medium rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" /> Principal
              </span>
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">
              Infusão de Boldina Potencializada
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              O segredo da piscina de ácido
            </p>
            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" /> 60 min (com freezer)
              </span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <DollarSign className="w-4 h-4" /> ~R$6
              </span>
            </div>
            <button
              onClick={() => navigate('/app/receitas/infusao')}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium"
            >
              Ver receita completa
            </button>
          </div>
        </div>

        {/* Recipe 2 */}
        <div className="bg-surface rounded-2xl p-5">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-warning/30 to-warning/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-3xl">☕</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground mb-1">
                Café Ativador de Gastrina
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Dispara a produção de ácido
              </p>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" /> 5 minutos
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate('/app/receitas/cafe')}
            className="w-full mt-4 py-3 border border-primary text-primary rounded-xl font-medium"
          >
            Ver receita
          </button>
        </div>

        {/* Sequence Card */}
        <div className="bg-surface rounded-2xl p-5">
          <h3 className="font-bold text-foreground mb-4">Como Tomar (Sequência)</h3>
          <div className="space-y-4">
            {[
              { time: '6:00', action: 'Acordar (em jejum)', icon: '🌅' },
              { time: '6:30', action: 'Tomar 300ml da Infusão', icon: '🍵' },
              { time: '6:45', action: 'Tomar o café', icon: '☕' },
              { time: '7:15', action: 'Pode comer normalmente', icon: '🍽️' },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-16 text-right">
                  <span className="text-primary font-bold">{step.time}</span>
                </div>
                <div className="w-px h-8 bg-primary/30 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{step.icon}</span>
                  <span className="text-sm text-foreground">{step.action}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-warning/10 rounded-xl">
            <p className="text-sm text-warning font-medium text-center">
              A sequência é FUNDAMENTAL para funcionar!
            </p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
