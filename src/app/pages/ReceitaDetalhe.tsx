import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, Clock, AlertTriangle, Timer, Play, X } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { Button } from '@/components/ui/button';

const receitas = {
  infusao: {
    nome: 'Infusão de Boldina Potencializada',
    emoji: '🍵',
    tempo: '60 minutos (com freezer)',
    custo: '~R$6',
    dificuldade: 'Fácil',
    ingredientes: [
      '10 folhas de boldo frescas (ou 2 colheres de sopa de boldo seco)',
      '1 pedaço de gengibre do tamanho do seu polegar',
      '500ml de água',
    ],
    passos: [
      { texto: 'Ferva a água', tempo: null, critico: false },
      { texto: 'Adicione o boldo e o gengibre ralado', tempo: null, critico: false },
      { texto: 'Deixe ferver por 3 minutos', tempo: 3 * 60, critico: false },
      { texto: 'Desligue o fogo e tampe a panela', tempo: null, critico: false },
      { texto: 'Deixe em infusão por 15 minutos', tempo: 15 * 60, critico: false },
      { texto: 'Coe e coloque em uma garrafa', tempo: null, critico: false },
      { texto: 'PASSO CRÍTICO: Coloque no freezer por exatamente 40 minutos', tempo: 40 * 60, critico: true },
      { texto: 'Retire e deixe voltar à temperatura ambiente', tempo: null, critico: false },
    ],
    explicacao: 'Por que o freezer? O frio extremo quebra as paredes celulares do boldo e libera 3x mais boldina.',
  },
  cafe: {
    nome: 'Café Ativador de Gastrina',
    emoji: '☕',
    tempo: '5 minutos',
    custo: '~R$2',
    dificuldade: 'Muito fácil',
    ingredientes: [
      '1 colher de sopa de café em pó (tradicional ou forte)',
      '150ml de água quente',
      'Não adicione açúcar nem adoçante',
    ],
    passos: [
      { texto: 'Ferva a água', tempo: null, critico: false },
      { texto: 'Coloque o café no filtro ou coador', tempo: null, critico: false },
      { texto: 'Despeje a água quente lentamente', tempo: null, critico: false },
      { texto: 'Espere esfriar um pouco e tome puro', tempo: null, critico: false },
    ],
    explicacao: 'O café puro ativa a produção de gastrina, que aumenta a acidez estomacal e potencializa o efeito da boldina.',
  },
};

export function ReceitaDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { markReceitaAsViewed, checkAndUnlockConquistas, stats } = useApp();
  
  const [ingredientesCheck, setIngredientesCheck] = useState<boolean[]>([]);
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerLabel, setTimerLabel] = useState('');

  const receita = id ? receitas[id as keyof typeof receitas] : null;

  useEffect(() => {
    if (id) {
      markReceitaAsViewed(id);
      checkAndUnlockConquistas(stats);
    }
  }, [id]);

  useEffect(() => {
    if (receita) {
      setIngredientesCheck(new Array(receita.ingredientes.length).fill(false));
    }
  }, [receita]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            setTimerActive(false);
            // Vibrate if supported
            if (navigator.vibrate) {
              navigator.vibrate([200, 100, 200, 100, 200]);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const startTimer = (seconds: number, label: string) => {
    setTimerSeconds(seconds);
    setTimerLabel(label);
    setTimerActive(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!receita) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <AppHeader title="Receita" showBack />
        <div className="max-w-lg mx-auto px-6 py-12 text-center">
          <p className="text-muted-foreground">Receita não encontrada</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <AppHeader title="Receita" showBack />

      {/* Timer Modal */}
      {timerActive && (
        <div className="fixed inset-0 z-50 bg-background/95 flex flex-col items-center justify-center">
          <button
            onClick={() => setTimerActive(false)}
            className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-6 h-6" />
          </button>
          <Timer className="w-16 h-16 text-primary mb-4 animate-pulse" />
          <p className="text-muted-foreground mb-2">{timerLabel}</p>
          <p className="text-7xl font-bold text-foreground mb-8">{formatTime(timerSeconds)}</p>
          <Button
            onClick={() => setTimerActive(false)}
            variant="outline"
            className="border-destructive text-destructive"
          >
            Cancelar
          </Button>
        </div>
      )}

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl p-6 text-center">
          <span className="text-6xl">{receita.emoji}</span>
          <h1 className="text-xl font-bold text-foreground mt-4">{receita.nome}</h1>
          <div className="flex items-center justify-center gap-4 mt-3">
            <span className="px-3 py-1 bg-surface rounded-full text-xs text-muted-foreground">
              ⏱️ {receita.tempo}
            </span>
            <span className="px-3 py-1 bg-surface rounded-full text-xs text-muted-foreground">
              💰 {receita.custo}
            </span>
          </div>
        </div>

        {/* Ingredientes */}
        <div className="bg-surface rounded-2xl p-5">
          <h2 className="font-bold text-foreground mb-4">Ingredientes</h2>
          <div className="space-y-3">
            {receita.ingredientes.map((ing, i) => (
              <button
                key={i}
                onClick={() => {
                  const newChecks = [...ingredientesCheck];
                  newChecks[i] = !newChecks[i];
                  setIngredientesCheck(newChecks);
                }}
                className="w-full flex items-start gap-3 text-left"
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  ingredientesCheck[i] ? 'bg-primary border-primary' : 'border-muted-foreground'
                }`}>
                  {ingredientesCheck[i] && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <span className={`text-sm ${ingredientesCheck[i] ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                  {ing}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Modo de Preparo */}
        <div className="space-y-4">
          <h2 className="font-bold text-foreground">Modo de Preparo</h2>
          {receita.passos.map((passo, i) => (
            <div
              key={i}
              className={`bg-surface rounded-xl p-4 ${passo.critico ? 'border-2 border-warning' : ''}`}
            >
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-2">
                    {passo.critico && <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />}
                    <p className={`text-sm ${passo.critico ? 'text-warning font-medium' : 'text-foreground'}`}>
                      {passo.texto}
                    </p>
                  </div>
                  {passo.tempo && (
                    <button
                      onClick={() => startTimer(passo.tempo!, passo.texto)}
                      className="mt-3 flex items-center gap-2 px-3 py-2 bg-primary/20 text-primary rounded-lg text-sm font-medium"
                    >
                      <Play className="w-4 h-4" />
                      Iniciar timer: {Math.floor(passo.tempo / 60)} min
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explicação */}
        <div className="bg-surface rounded-2xl p-5 border-l-4 border-primary">
          <p className="text-sm text-muted-foreground italic">{receita.explicacao}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-16 left-0 right-0 p-6 bg-background border-t border-border/50">
        <Button
          onClick={() => navigate('/app/checkin')}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-xl"
        >
          Concluí o preparo! ✓
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}
