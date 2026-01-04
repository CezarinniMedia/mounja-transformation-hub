import { Gift, Lock, Bell, Check } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

const bonus = [
  { icon: '✨', titulo: 'Chá que Elimina Manchas Escuras', descricao: 'Receita natural para clarear manchas de pele, melasma e sardas. Resultados visíveis em semanas.', tag: 'Receita + Modo de uso', valor: 47 },
  { icon: '💪', titulo: 'Protocolo Anti-Flacidez', descricao: 'Técnicas e receitas para manter a pele firme enquanto emagrece. Evite a temida "sobra de pele".', tag: 'Guia completo', valor: 67 },
  { icon: '💇‍♀️', titulo: 'Receita do Shampoo Bomba', descricao: 'Faça seu cabelo crescer forte, brilhante e saudável com ingredientes naturais.', tag: 'Receita caseira', valor: 37 },
  { icon: '🍽️', titulo: 'Cardápio Semanal Completo', descricao: 'O que comer em cada refeição para potencializar seus resultados. Café da manhã, almoço, jantar e lanches.', tag: '7 dias planejados', valor: 47 },
  { icon: '🛒', titulo: 'Lista de Compras do Método', descricao: 'Lista completa de tudo que você precisa comprar no mercado. Prático e econômico.', tag: 'PDF para imprimir', valor: 27 },
  { icon: '🔥', titulo: '10 Receitas Termogênicas', descricao: 'Chás e bebidas extras para acelerar ainda mais seu metabolismo.', tag: 'Receitas extras', valor: 37 },
];

export function Bonus() {
  const [notificar, setNotificar] = useState(true);
  const totalValor = bonus.reduce((acc, b) => acc + b.valor, 0);

  return (
    <div className="min-h-screen bg-background pb-32">
      <AppHeader title="Seus Bônus" showBack rightElement={
        <span className="px-2 py-1 bg-warning text-warning-foreground text-xs font-bold rounded-full">
          EM BREVE
        </span>
      } />

      <div className="max-w-lg mx-auto px-6 py-6 space-y-4">
        <p className="text-muted-foreground">
          Preparamos presentes especiais para turbinar sua transformação. Cada bônus complementa o método principal.
        </p>

        {/* Bonus List */}
        <div className="space-y-3">
          {bonus.map((item, i) => (
            <div key={i} className="bg-surface rounded-xl p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-warning/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Lock className="w-3 h-3 text-muted-foreground" />
                    <h3 className="font-bold text-foreground">{item.titulo}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.descricao}</p>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {item.tag}
                  </span>
                </div>
              </div>
              <p className="text-xs text-warning mt-3">🔒 Liberando em breve</p>
            </div>
          ))}
        </div>

        {/* Value Card */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5">
          <p className="text-sm text-muted-foreground mb-3">Se vendidos separadamente:</p>
          <div className="space-y-2 mb-4">
            {bonus.map((b, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{b.titulo.split(' ').slice(0, 2).join(' ')}...</span>
                <span className="text-foreground">R${b.valor}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-3 mb-3">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-foreground">Total:</span>
              <span className="text-foreground">R${totalValor}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <Gift className="w-5 h-5" />
            <span className="font-bold">Você ganha TUDO de presente! 🎁</span>
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-16 left-0 right-0 p-6 bg-background border-t border-border/50">
        <div className="bg-surface rounded-xl p-4 flex items-center gap-4">
          <Bell className="w-6 h-6 text-primary flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-foreground font-medium">Me avise quando liberar</p>
          </div>
          <Switch
            checked={notificar}
            onCheckedChange={setNotificar}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
