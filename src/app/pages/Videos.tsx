import { Video, Lock, Bell } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

const videos = [
  { titulo: 'Como preparar a infusão perfeita', duracao: '12 minutos', descricao: 'Passo a passo detalhado para não errar na preparação' },
  { titulo: 'A ciência por trás da Piscina de Ácido', duracao: '8 minutos', descricao: 'Entenda como seu estômago funciona e por que o método é tão eficaz' },
  { titulo: '5 erros que sabotam seu resultado', duracao: '10 minutos', descricao: 'Evite esses erros comuns e acelere sua transformação' },
  { titulo: 'Depoimentos reais de transformação', duracao: '15 minutos', descricao: 'Histórias inspiradoras de mulheres que conseguiram' },
  { titulo: 'Protocolo de manutenção', duracao: '7 minutos', descricao: 'Como manter os resultados para sempre' },
  { titulo: 'Respondendo suas dúvidas', duracao: '20 minutos', descricao: 'As perguntas mais frequentes respondidas pela Dra. Alessandra' },
];

export function Videos() {
  const [notificar, setNotificar] = useState(true);

  return (
    <div className="min-h-screen bg-background pb-32">
      <AppHeader title="Videoaulas" showBack rightElement={
        <span className="px-2 py-1 bg-warning text-warning-foreground text-xs font-bold rounded-full">
          EM BREVE
        </span>
      } />

      <div className="max-w-lg mx-auto px-6 py-6 space-y-4">
        <p className="text-muted-foreground">
          Aprenda na prática com vídeos exclusivos. Cada aula foi gravada para tirar todas as suas dúvidas.
        </p>

        {/* Video List */}
        <div className="space-y-3">
          {videos.map((video, i) => (
            <div key={i} className="bg-surface rounded-xl overflow-hidden">
              <div className="h-24 bg-gradient-to-br from-warning/20 to-warning/5 flex items-center justify-center relative">
                <Video className="w-10 h-10 text-warning" />
                <div className="absolute top-2 right-2">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground mb-1">{video.titulo}</h3>
                <p className="text-xs text-muted-foreground mb-2">{video.duracao}</p>
                <p className="text-sm text-muted-foreground">{video.descricao}</p>
                <p className="text-xs text-warning mt-2">🔒 Disponível em breve</p>
              </div>
            </div>
          ))}
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
