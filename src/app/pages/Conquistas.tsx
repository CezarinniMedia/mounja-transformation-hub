import { useMemo, useState } from 'react';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { CONQUISTAS, ConquistaDefinition } from '../types';
import { Lock, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const categorias = [
  { id: 'todas', label: 'Todas' },
  { id: 'primeiros_passos', label: 'Início' },
  { id: 'streak', label: 'Streak' },
  { id: 'peso', label: 'Peso' },
  { id: 'protocolo', label: 'Protocolo' },
  { id: 'bem_estar', label: 'Bem-estar' },
  { id: 'tempo', label: 'Tempo' },
];

export function Conquistas() {
  const { conquistas, isConquistaUnlocked, getUnlockedCount, stats } = useApp();
  const [categoria, setCategoria] = useState('todas');

  const filteredConquistas = useMemo(() => {
    if (categoria === 'todas') return CONQUISTAS;
    return CONQUISTAS.filter(c => c.categoria === categoria);
  }, [categoria]);

  const proximaConquista = useMemo(() => {
    const locked = CONQUISTAS.filter(c => !isConquistaUnlocked(c.id));
    // Find closest to unlock based on progress
    return locked[0] || null;
  }, [isConquistaUnlocked]);

  const getUnlockDate = (conquistaId: string) => {
    const c = conquistas.find(c => c.conquista_id === conquistaId);
    return c ? format(new Date(c.desbloqueado_em), "dd/MM/yyyy", { locale: ptBR }) : null;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader title="Suas Conquistas" showBack />

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Counter */}
        <p className="text-center text-muted-foreground">
          <span className="text-primary font-bold">{getUnlockedCount()}</span> de {CONQUISTAS.length} desbloqueadas
        </p>

        {/* Next Achievement */}
        {proximaConquista && (
          <div className="bg-surface rounded-2xl p-5 border border-warning/30">
            <p className="text-xs text-warning uppercase tracking-wider mb-2">Próxima conquista</p>
            <div className="flex items-center gap-4">
              <span className="text-4xl grayscale">{proximaConquista.emoji}</span>
              <div>
                <p className="font-bold text-foreground">{proximaConquista.nome}</p>
                <p className="text-sm text-muted-foreground">{proximaConquista.descricao}</p>
              </div>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoria(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                categoria === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface text-muted-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredConquistas.map(conquista => {
            const unlocked = isConquistaUnlocked(conquista.id);
            const unlockDate = getUnlockDate(conquista.id);

            return (
              <div
                key={conquista.id}
                className={`relative bg-surface rounded-xl p-4 ${
                  unlocked ? 'border border-primary' : 'opacity-60'
                }`}
              >
                {!unlocked && (
                  <Lock className="absolute top-2 right-2 w-4 h-4 text-muted-foreground" />
                )}
                <span className={`text-4xl ${!unlocked ? 'grayscale' : ''}`}>
                  {conquista.emoji}
                </span>
                <p className={`font-bold mt-2 ${unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {conquista.nome}
                </p>
                <p className="text-xs text-muted-foreground">{conquista.descricao}</p>
                {unlockDate && (
                  <p className="text-xs text-primary mt-2">✓ {unlockDate}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Share Button */}
        {getUnlockedCount() > 0 && (
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-surface rounded-xl text-foreground hover:bg-surface/80 transition-colors">
            <Share2 className="w-5 h-5" />
            <span className="font-medium">Compartilhar minhas conquistas</span>
          </button>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
