import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Rocket, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '../context/AppContext';
import { Confetti } from '../components/Confetti';
import { useToast } from '@/hooks/use-toast';

export function Pronta() {
  const navigate = useNavigate();
  const { createProfile, user } = useApp();
  const { toast } = useToast();
  
  const [showConfetti, setShowConfetti] = useState(true);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const tempProfile = sessionStorage.getItem('mounja_temp_profile');
    if (!tempProfile) {
      navigate('/app/configurar');
      return;
    }
    setProfileData(JSON.parse(tempProfile));
  }, [navigate]);

  const handleStart = async () => {
    if (!profileData || !user) return;

    setLoading(true);
    try {
      const { error } = await createProfile({
        nome: profileData.nome,
        peso_inicial: profileData.peso_inicial,
        meta_peso: profileData.meta_peso,
        data_inicio: new Date().toISOString().split('T')[0],
        cintura_inicial: profileData.cintura_inicial || null,
        quadril_inicial: profileData.quadril_inicial || null,
        modo: 'ativo',
        notificacoes: true,
        animacoes: true,
      });

      if (error) throw error;

      // Clear temp storage
      sessionStorage.removeItem('mounja_temp_profile');

      toast({
        title: "Perfil criado!",
        description: "Sua jornada começa agora!",
      });

      navigate('/app/dashboard');
    } catch (error) {
      console.error('Error creating profile:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar seu perfil. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!profileData) return null;

  const pesoAPerder = (profileData.peso_inicial - profileData.meta_peso).toFixed(1);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Content */}
      <div className="flex-1 px-6 pt-12 pb-32 overflow-y-auto">
        {/* Check Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative animate-scale-in">
            <CheckCircle className="w-20 h-20 text-primary" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-[28px] font-bold text-foreground text-center mb-2">
          Tudo pronto, {profileData.nome}!
        </h1>
        <p className="text-base text-muted-foreground text-center mb-8">
          Sua jornada de transformação começa AGORA
        </p>

        {/* Summary Card */}
        <div className="bg-surface rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Peso inicial</p>
              <p className="text-lg font-bold text-foreground">
                {profileData.peso_inicial.toFixed(1)} kg
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Meta</p>
              <p className="text-lg font-bold text-foreground">
                {profileData.meta_peso.toFixed(1)} kg
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">A perder</p>
              <p className="text-lg font-bold text-primary">
                {pesoAPerder} kg
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Início</p>
              <p className="text-lg font-bold text-foreground">Hoje</p>
            </div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="bg-surface rounded-2xl p-5 border-l-4 border-primary">
          <p className="text-muted-foreground italic leading-relaxed">
            "Não importa quanto tempo leve. O que importa é que você está começando. E eu vou estar com você em cada passo até você chegar lá."
          </p>
          <p className="text-primary text-sm mt-3 italic">— Dra. Alessandra</p>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border/50">
        <Button
          onClick={handleStart}
          disabled={loading}
          className="w-full h-14 bg-warning hover:bg-warning/90 text-warning-foreground font-semibold text-base rounded-xl flex items-center justify-center gap-2 pulse-cta"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Começar agora!
              <Rocket className="w-5 h-5" />
            </>
          )}
        </Button>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
