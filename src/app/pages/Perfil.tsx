import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Scale, Target, Calendar, Ruler, Trophy, Flame, FileDown, RotateCcw, LogOut, Loader2 } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function Perfil() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    profile, 
    user,
    signOut,
    weightLost,
    daysInProgram,
    calculateStreak,
    getUnlockedCount,
    updateProfile,
  } = useApp();

  const [nome, setNome] = useState(profile?.nome || '');
  const [metaPeso, setMetaPeso] = useState(profile?.meta_peso.toString() || '');
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!profile) {
    navigate('/app');
    return null;
  }

  const handleSave = async () => {
    if (!nome || !metaPeso) return;
    
    setLoading(true);
    try {
      await updateProfile({
        nome,
        meta_peso: parseFloat(metaPeso),
      });
      setEditando(false);
      toast({
        title: "Perfil atualizado!",
        description: "Suas alterações foram salvas.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/app/auth');
  };

  const handleExport = () => {
    const data = {
      profile,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mounja-natural-dados-${format(new Date(), 'yyyy-MM-dd')}.json`;
    a.click();
    
    toast({
      title: "Dados exportados!",
      description: "Arquivo baixado com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader title="Meu Perfil" showBack />

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-3">
            <span className="text-3xl font-bold text-primary-foreground">
              {profile.nome.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-xl font-bold text-foreground">{profile.nome}</h2>
          <p className="text-sm text-muted-foreground">No programa há {daysInProgram} dias</p>
        </div>

        {/* Dados */}
        <div className="bg-surface rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-foreground">Meus Dados</h3>
            <button 
              onClick={() => setEditando(!editando)}
              className="text-sm text-primary font-medium"
            >
              {editando ? 'Cancelar' : 'Editar'}
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <User className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Nome</p>
                {editando ? (
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground"
                  />
                ) : (
                  <p className="text-foreground">{profile.nome}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Scale className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Peso inicial</p>
                <p className="text-foreground">{profile.peso_inicial.toFixed(1)} kg</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Target className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Meta de peso</p>
                {editando ? (
                  <input
                    type="number"
                    step="0.1"
                    value={metaPeso}
                    onChange={(e) => setMetaPeso(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground"
                  />
                ) : (
                  <p className="text-foreground">{profile.meta_peso.toFixed(1)} kg</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Data de início</p>
                <p className="text-foreground">
                  {format(new Date(profile.data_inicio), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
              </div>
            </div>

            {(profile.cintura_inicial || profile.quadril_inicial) && (
              <div className="flex items-center gap-4">
                <Ruler className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Medidas iniciais</p>
                  <p className="text-foreground">
                    {profile.cintura_inicial && `Cintura: ${profile.cintura_inicial}cm`}
                    {profile.cintura_inicial && profile.quadril_inicial && ' | '}
                    {profile.quadril_inicial && `Quadril: ${profile.quadril_inicial}cm`}
                  </p>
                </div>
              </div>
            )}
          </div>

          {editando && (
            <Button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Salvar alterações'}
            </Button>
          )}
        </div>

        {/* Estatísticas */}
        <div className="bg-surface rounded-2xl p-5">
          <h3 className="font-bold text-foreground mb-4">Estatísticas</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-primary" />
              <div>
                <p className="text-lg font-bold text-primary">{weightLost.toFixed(1)} kg</p>
                <p className="text-xs text-muted-foreground">perdidos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-lg font-bold text-foreground">{daysInProgram}</p>
                <p className="text-xs text-muted-foreground">dias</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Flame className="w-5 h-5 text-warning" />
              <div>
                <p className="text-lg font-bold text-foreground">{calculateStreak()}</p>
                <p className="text-xs text-muted-foreground">streak</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-warning" />
              <div>
                <p className="text-lg font-bold text-foreground">{getUnlockedCount()}</p>
                <p className="text-xs text-muted-foreground">conquistas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="space-y-3">
          <button
            onClick={handleExport}
            className="w-full flex items-center justify-center gap-2 py-3 bg-surface text-foreground rounded-xl"
          >
            <FileDown className="w-5 h-5" />
            Exportar meus dados
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 bg-surface text-destructive rounded-xl"
          >
            <LogOut className="w-5 h-5" />
            Sair da conta
          </button>
        </div>

        {/* Sobre */}
        <div className="text-center text-sm text-muted-foreground pt-4">
          <p>Versão 1.0.0</p>
          <p>Criado com 💚 pelo Método Mounja Natural</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
