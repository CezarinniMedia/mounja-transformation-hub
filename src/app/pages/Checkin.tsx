import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Loader2 } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';
import { Button } from '@/components/ui/button';
import { useApp } from '../context/AppContext';
import { Confetti } from '../components/Confetti';
import { useToast } from '@/hooks/use-toast';

const humorOptions = [
  { value: 1, emoji: '😫', label: 'Difícil' },
  { value: 2, emoji: '😐', label: 'Normal' },
  { value: 3, emoji: '🙂', label: 'Bem' },
  { value: 4, emoji: '😊', label: 'Ótima' },
  { value: 5, emoji: '🤩', label: 'Incrível!' },
];

export function Checkin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    profile, 
    getTodayCheckin, 
    getLatestWeight, 
    createCheckin,
    checkAndUnlockConquistas,
    stats,
    refetchCheckins,
  } = useApp();

  const todayCheckin = getTodayCheckin();
  const lastWeight = getLatestWeight() || profile?.peso_inicial || 0;

  const [peso, setPeso] = useState(lastWeight.toString());
  const [infusao, setInfusao] = useState(todayCheckin?.infusao || false);
  const [cafe, setCafe] = useState(todayCheckin?.cafe || false);
  const [esperou30min, setEsperou30min] = useState(todayCheckin?.esperou_30min || false);
  const [agua2l, setAgua2l] = useState(todayCheckin?.agua_2l || false);
  const [humor, setHumor] = useState<number | null>(todayCheckin?.humor || null);
  const [anotacao, setAnotacao] = useState(todayCheckin?.anotacao || '');
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const pesoNum = parseFloat(peso);
  const pesoDiff = lastWeight - pesoNum;
  const protocoloCount = [infusao, cafe, esperou30min, agua2l].filter(Boolean).length;
  const isValid = pesoNum >= 40 && pesoNum <= 250 && protocoloCount >= 1;

  const today = new Date();
  const dateStr = today.toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  const handleSubmit = async () => {
    if (todayCheckin) {
      toast({
        title: "Já registrado!",
        description: "Você já fez check-in hoje. Volte amanhã 😊",
      });
      return;
    }

    if (!isValid) {
      toast({
        title: "Verifique os campos",
        description: "Peso válido e pelo menos 1 item do protocolo são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await createCheckin({
        data: today.toISOString().split('T')[0],
        peso: pesoNum,
        cintura: null,
        quadril: null,
        infusao,
        cafe,
        esperou_30min: esperou30min,
        agua_2l: agua2l,
        humor,
        anotacao: anotacao.trim() || null,
      });

      if (error) throw error;

      setShowConfetti(true);
      
      // Check for new conquistas
      await refetchCheckins();
      const newConquistas = await checkAndUnlockConquistas({
        ...stats,
        totalCheckins: stats.totalCheckins + 1,
      });

      if (newConquistas.length > 0) {
        toast({
          title: "🎉 Nova conquista!",
          description: "Você desbloqueou uma nova conquista!",
        });
      } else {
        toast({
          title: "Check-in salvo!",
          description: "Continue assim! 💪",
        });
      }

      setTimeout(() => navigate('/app/dashboard'), 2000);
    } catch (error) {
      console.error('Error creating checkin:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o check-in",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (todayCheckin) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <AppHeader title="Check-in do dia" showBack />
        <div className="max-w-lg mx-auto px-6 py-12 text-center">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Já registrado!</h2>
          <p className="text-muted-foreground mb-8">
            Você já fez check-in hoje. Volte amanhã 😊
          </p>
          <Button onClick={() => navigate('/app/dashboard')} variant="outline">
            Voltar ao início
          </Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <Confetti active={showConfetti} />
      
      <AppHeader title="Check-in do dia" showBack />

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        <p className="text-sm text-muted-foreground text-center capitalize">{dateStr}</p>

        {/* Peso */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            Quanto você está pesando hoje?
          </label>
          <div className="bg-surface rounded-2xl p-6">
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                className="w-full text-center text-6xl font-bold bg-transparent text-foreground focus:outline-none"
                placeholder="0.0"
              />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl text-muted-foreground">
                kg
              </span>
            </div>
            
            {pesoNum > 0 && lastWeight > 0 && !todayCheckin && (
              <p className={`text-center mt-4 font-medium ${
                pesoDiff > 0 ? 'text-primary' : pesoDiff < 0 ? 'text-warning' : 'text-muted-foreground'
              }`}>
                {pesoDiff > 0 ? '📉' : pesoDiff < 0 ? '📈' : '➡️'} 
                {pesoDiff > 0 ? ` -${pesoDiff.toFixed(1)}kg` : pesoDiff < 0 ? ` +${Math.abs(pesoDiff).toFixed(1)}kg` : ' Manteve o peso'}
                {' '}desde ontem
              </p>
            )}
          </div>
        </div>

        {/* Protocolo */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            Você seguiu o protocolo hoje?
          </label>
          <div className="space-y-2">
            {[
              { state: infusao, setState: setInfusao, label: 'Tomei a infusão de boldina ☕' },
              { state: cafe, setState: setCafe, label: 'Tomei o café ativador ☕' },
              { state: esperou30min, setState: setEsperou30min, label: 'Esperei 30min antes de comer ⏰' },
              { state: agua2l, setState: setAgua2l, label: 'Bebi pelo menos 2L de água 💧' },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => item.setState(!item.state)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-colors ${
                  item.state ? 'bg-primary/20 border border-primary' : 'bg-surface'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                  item.state ? 'bg-primary border-primary' : 'border-muted-foreground'
                }`}>
                  {item.state && <Check className="w-4 h-4 text-primary-foreground" />}
                </div>
                <span className={`text-sm ${item.state ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{protocoloCount} de 4 concluídos</p>
        </div>

        {/* Humor */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Como está se sentindo?</label>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {humorOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setHumor(option.value)}
                className={`flex-shrink-0 flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                  humor === option.value 
                    ? 'bg-primary/20 border border-primary scale-105' 
                    : 'bg-surface'
                }`}
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className="text-xs text-muted-foreground">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Anotação */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            Quer anotar algo sobre hoje?
          </label>
          <textarea
            value={anotacao}
            onChange={(e) => setAnotacao(e.target.value.slice(0, 280))}
            placeholder="Ex: Acordei mais disposta, roupas ficando largas..."
            rows={3}
            className="w-full p-4 bg-surface border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
          />
          <p className="text-xs text-muted-foreground text-right">{anotacao.length}/280</p>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-16 left-0 right-0 p-6 bg-background border-t border-border/50">
        <Button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className="w-full h-14 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground font-semibold text-base rounded-xl flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Check className="w-5 h-5" />
              Salvar meu check-in
            </>
          )}
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}
