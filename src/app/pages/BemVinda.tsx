import { useNavigate } from 'react-router-dom';
import { Heart, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BemVinda() {
  const navigate = useNavigate();

  const features = [
    "Receita completa passo a passo",
    "Acompanhamento diário do seu progresso",
    "Comunidade exclusiva de mulheres",
    "Vídeos e bônus especiais",
    "Conquistas para te motivar",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Content */}
      <div className="flex-1 px-6 pt-12 pb-32 overflow-y-auto">
        {/* Heart Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Heart className="w-12 h-12 text-primary fill-primary animate-pulse" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-[28px] font-bold text-foreground text-center mb-4">
          Bem-vinda à sua transformação!
        </h1>

        <p className="text-base text-muted-foreground text-center leading-relaxed mb-8">
          A partir de agora, eu vou te guiar passo a passo no Método Piscina de Ácido. Você não está sozinha nessa jornada.
        </p>

        {/* Features Card */}
        <div className="bg-surface border border-primary/20 rounded-2xl p-5">
          <h2 className="text-base font-bold text-foreground mb-4">
            O que você vai encontrar aqui:
          </h2>
          
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border/50">
        <Button
          onClick={() => navigate('/app/configurar')}
          className="w-full h-14 bg-warning hover:bg-warning/90 text-warning-foreground font-semibold text-base rounded-xl flex items-center justify-center gap-2"
        >
          Começar minha jornada
          <ArrowRight className="w-5 h-5" />
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-3">
          Leva menos de 1 minuto para configurar
        </p>
      </div>
    </div>
  );
}
