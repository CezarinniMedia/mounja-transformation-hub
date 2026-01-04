import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Scale, Target, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function Configurar() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [nome, setNome] = useState('');
  const [pesoAtual, setPesoAtual] = useState('');
  const [metaPeso, setMetaPeso] = useState('');
  const [loading, setLoading] = useState(false);

  const isValid = nome.length >= 2 && 
    parseFloat(pesoAtual) >= 40 && parseFloat(pesoAtual) <= 250 &&
    parseFloat(metaPeso) >= 40 && parseFloat(metaPeso) < parseFloat(pesoAtual);

  const handleSubmit = () => {
    if (!isValid) {
      toast({
        title: "Verifique os campos",
        description: "Preencha todos os campos corretamente",
        variant: "destructive",
      });
      return;
    }

    // Store temporarily in session storage for the next step
    sessionStorage.setItem('mounja_temp_profile', JSON.stringify({
      nome,
      peso_inicial: parseFloat(pesoAtual),
      meta_peso: parseFloat(metaPeso),
    }));

    navigate('/app/configurar-medidas');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Vamos nos conhecer</h1>
        <span className="text-sm text-muted-foreground">1 de 2</span>
      </header>

      {/* Progress bar */}
      <div className="px-6 mb-8">
        <div className="h-1 bg-surface rounded-full overflow-hidden">
          <div className="h-full bg-primary w-1/2 rounded-full" />
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pb-32 overflow-y-auto">
        <div className="space-y-6">
          {/* Nome */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Como posso te chamar?
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome ou apelido"
                className="w-full h-14 pl-12 pr-4 bg-surface border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Peso atual */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Qual seu peso hoje?
            </label>
            <div className="relative">
              <Scale className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="number"
                step="0.1"
                value={pesoAtual}
                onChange={(e) => setPesoAtual(e.target.value)}
                placeholder="Ex: 78.5"
                className="w-full h-14 pl-12 pr-12 bg-surface border border-border rounded-xl text-2xl font-bold text-foreground placeholder:text-muted-foreground placeholder:font-normal placeholder:text-base focus:outline-none focus:border-primary transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                kg
              </span>
            </div>
          </div>

          {/* Meta de peso */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Qual seu peso dos sonhos?
            </label>
            <div className="relative">
              <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="number"
                step="0.1"
                value={metaPeso}
                onChange={(e) => setMetaPeso(e.target.value)}
                placeholder="Ex: 65.0"
                className="w-full h-14 pl-12 pr-12 bg-surface border border-border rounded-xl text-2xl font-bold text-foreground placeholder:text-muted-foreground placeholder:font-normal placeholder:text-base focus:outline-none focus:border-primary transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                kg
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Não se preocupe, você pode mudar depois
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border/50">
        <Button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className="w-full h-14 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground font-semibold text-base rounded-xl"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Próximo'}
        </Button>
      </div>
    </div>
  );
}
