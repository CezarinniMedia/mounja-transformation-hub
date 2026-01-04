import { useNavigate } from 'react-router-dom';
import { Star, Users, Video, Gift, MessageCircle, Lock } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';

export function VipHub() {
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    window.open('https://wa.me/5511999999999?text=Olá! Preciso de suporte VIP do Método Mounja Natural.', '_blank');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader 
        title="" 
        showBack 
        rightElement={
          <div className="flex items-center gap-2 text-warning">
            <Star className="w-5 h-5" />
            <span className="font-bold">Área VIP</span>
          </div>
        }
      />

      <div className="max-w-lg mx-auto px-6 py-6 space-y-4">
        <p className="text-muted-foreground text-center">Seus conteúdos exclusivos</p>

        {/* Comunidade */}
        <div 
          onClick={() => navigate('/app/comunidade')}
          className="bg-gradient-to-br from-warning/20 to-surface rounded-2xl p-5 cursor-pointer"
        >
          <div className="flex items-start justify-between mb-3">
            <Users className="w-12 h-12 text-warning" />
            <span className="px-2 py-1 bg-warning text-warning-foreground text-xs font-bold rounded-full animate-pulse">
              🔓 EM BREVE
            </span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Comunidade Mounja</h3>
          <p className="text-sm text-muted-foreground">
            Grupo exclusivo no WhatsApp com milhares de mulheres na mesma jornada. Troque experiências, tire dúvidas e se inspire!
          </p>
          <button className="mt-4 px-4 py-2 border border-warning text-warning rounded-xl text-sm font-medium">
            Quero ser avisada
          </button>
        </div>

        {/* Videoaulas */}
        <div 
          onClick={() => navigate('/app/videos')}
          className="bg-surface rounded-2xl p-5 cursor-pointer"
        >
          <div className="flex items-start justify-between mb-3">
            <Video className="w-10 h-10 text-warning" />
            <span className="px-2 py-1 bg-warning text-warning-foreground text-xs font-bold rounded-full">
              🔓 EM BREVE
            </span>
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">Videoaulas Exclusivas</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Aprenda na prática com vídeos detalhados.
          </p>
          <div className="space-y-2">
            {['Como preparar a infusão perfeita', 'A ciência da Piscina de Ácido', 'Erros que sabotam seu resultado'].map((video, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="w-3 h-3" />
                <span>{video}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bônus */}
        <div 
          onClick={() => navigate('/app/bonus')}
          className="bg-surface rounded-2xl p-5 cursor-pointer"
        >
          <div className="flex items-start justify-between mb-3">
            <Gift className="w-10 h-10 text-warning" />
            <span className="px-2 py-1 bg-warning text-warning-foreground text-xs font-bold rounded-full">
              🔓 EM BREVE
            </span>
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">Bônus Especiais</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Presentes exclusivos para turbinar sua transformação.
          </p>
          <div className="space-y-2">
            {['Chá Elimina Manchas', 'Protocolo Anti-Flacidez', 'Shampoo Bomba'].map((bonus, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="w-3 h-3" />
                <span>{bonus}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Suporte VIP */}
        <div className="bg-surface rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <MessageCircle className="w-10 h-10 text-primary" />
            <div>
              <h3 className="text-lg font-bold text-foreground">Suporte Prioritário</h3>
              <p className="text-sm text-muted-foreground">Precisa de ajuda? Nossa equipe está pronta.</p>
            </div>
          </div>
          <button
            onClick={handleWhatsApp}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Falar no WhatsApp
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
