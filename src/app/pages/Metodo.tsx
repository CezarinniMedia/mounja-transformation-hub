import { useNavigate } from 'react-router-dom';
import { BookOpen, HelpCircle } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';

export function Metodo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader title="O Método" showBack />

      <div className="max-w-lg mx-auto px-6 py-6 space-y-4">
        <p className="text-muted-foreground">
          Tudo que você precisa para seguir o protocolo corretamente.
        </p>

        {/* Receitas */}
        <button
          onClick={() => navigate('/app/receitas')}
          className="w-full bg-surface rounded-2xl p-5 flex items-center gap-4 text-left"
        >
          <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-1">Receitas</h3>
            <p className="text-sm text-muted-foreground">
              Aprenda a preparar a infusão e o café do método
            </p>
          </div>
        </button>

        {/* Dúvidas */}
        <button
          onClick={() => navigate('/app/duvidas')}
          className="w-full bg-surface rounded-2xl p-5 flex items-center gap-4 text-left"
        >
          <div className="w-14 h-14 bg-warning/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-7 h-7 text-warning" />
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-1">Dúvidas Frequentes</h3>
            <p className="text-sm text-muted-foreground">
              Respostas para as perguntas mais comuns
            </p>
          </div>
        </button>

        {/* Quick Tips */}
        <div className="bg-surface rounded-2xl p-5">
          <h3 className="font-bold text-foreground mb-4">Dicas Rápidas</h3>
          <div className="space-y-3">
            {[
              '☕ Tome a infusão logo ao acordar, em jejum',
              '⏰ Espere 15 minutos antes do café',
              '🚫 Não use adoçante no café',
              '💧 Beba pelo menos 2L de água por dia',
              '🍽️ Espere 30min para a primeira refeição',
              '❄️ Não pule o passo do freezer!',
            ].map((tip, i) => (
              <p key={i} className="text-sm text-muted-foreground">
                {tip}
              </p>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
