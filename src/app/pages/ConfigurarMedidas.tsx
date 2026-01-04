import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export function ConfigurarMedidas() {
  const navigate = useNavigate();

  const [cintura, setCintura] = useState('');
  const [quadril, setQuadril] = useState('');
  const [skipMedidas, setSkipMedidas] = useState(false);

  const handleSubmit = () => {
    // Get the temp profile from session storage
    const tempProfile = sessionStorage.getItem('mounja_temp_profile');
    if (!tempProfile) {
      navigate('/app/configurar');
      return;
    }

    const profile = JSON.parse(tempProfile);
    
    // Add measurements if provided
    if (!skipMedidas) {
      profile.cintura_inicial = cintura ? parseFloat(cintura) : null;
      profile.quadril_inicial = quadril ? parseFloat(quadril) : null;
    }

    // Save back to session storage
    sessionStorage.setItem('mounja_temp_profile', JSON.stringify(profile));
    
    navigate('/app/pronta');
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
        <h1 className="text-xl font-bold text-foreground">Medidas (opcional)</h1>
        <span className="text-sm text-muted-foreground">2 de 2</span>
      </header>

      {/* Progress bar */}
      <div className="px-6 mb-8">
        <div className="h-1 bg-surface rounded-full overflow-hidden">
          <div className="h-full bg-primary w-full rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-32 overflow-y-auto">
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          Medidas ajudam a ver resultados além da balança! Muitas vezes você perde centímetros antes de perder quilos.
        </p>

        {/* Form Card */}
        <div className={`bg-surface rounded-2xl p-5 space-y-4 ${skipMedidas ? 'opacity-50' : ''}`}>
          {/* Cintura */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Cintura (cm)
            </label>
            <div className="relative">
              <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="number"
                step="0.1"
                value={cintura}
                onChange={(e) => setCintura(e.target.value)}
                placeholder="Opcional"
                disabled={skipMedidas}
                className="w-full h-14 pl-12 pr-12 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                cm
              </span>
            </div>
          </div>

          {/* Quadril */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Quadril (cm)
            </label>
            <div className="relative">
              <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="number"
                step="0.1"
                value={quadril}
                onChange={(e) => setQuadril(e.target.value)}
                placeholder="Opcional"
                disabled={skipMedidas}
                className="w-full h-14 pl-12 pr-12 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                cm
              </span>
            </div>
          </div>
        </div>

        {/* Skip Checkbox */}
        <div className="flex items-center gap-3 mt-6">
          <Checkbox
            id="skip"
            checked={skipMedidas}
            onCheckedChange={(checked) => setSkipMedidas(checked === true)}
            className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <label htmlFor="skip" className="text-sm text-muted-foreground cursor-pointer">
            Prefiro não registrar medidas agora
          </label>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border/50">
        <Button
          onClick={handleSubmit}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-xl"
        >
          Concluir configuração
        </Button>
      </div>
    </div>
  );
}
