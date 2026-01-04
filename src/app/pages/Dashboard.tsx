import { useNavigate } from 'react-router-dom';
import { Settings, Flame, Calendar, CheckCircle, BookOpen, TrendingUp, Trophy, HelpCircle, Users, Video, Gift, MessageCircle, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BottomNav } from '../components/BottomNav';

export function Dashboard() {
  const navigate = useNavigate();
  const { 
    profile, 
    currentWeight, 
    weightLost, 
    progressPercent, 
    daysInProgram, 
    checkins,
    calculateStreak,
    getTodayCheckin,
    fraseDodia,
    getUnlockedCount,
  } = useApp();

  if (!profile) {
    navigate('/app/bem-vinda');
    return null;
  }

  const streak = calculateStreak();
  const todayCheckin = getTodayCheckin();
  const protocoloCompleto = todayCheckin ? 
    (todayCheckin.infusao && todayCheckin.cafe && todayCheckin.esperou_30min && todayCheckin.agua_2l) : false;
  const protocoloCount = todayCheckin ? 
    [todayCheckin.infusao, todayCheckin.cafe, todayCheckin.esperou_30min, todayCheckin.agua_2l].filter(Boolean).length : 0;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border/50 px-6 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <h1 className="text-lg text-foreground">
            Olá, {profile.nome}! 👋
          </h1>
          <button
            onClick={() => navigate('/app/perfil')}
            className="p-2 -mr-2 text-foreground hover:text-primary transition-colors"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-lg mx-auto px-6 py-6 space-y-5">
        {/* Card 1: Progress Principal */}
        <div className="bg-gradient-to-br from-surface to-primary/5 border border-primary rounded-2xl p-6">
          <div className="text-center mb-4">
            <p className="text-6xl font-extrabold text-foreground">
              {currentWeight.toFixed(1)}
            </p>
            <p className="text-lg text-muted-foreground">kg</p>
          </div>

          {weightLost > 0 ? (
            <p className="text-center text-primary font-semibold mb-4">
              Você já perdeu <span className="text-xl">{weightLost.toFixed(1)} kg</span>!
            </p>
          ) : (
            <p className="text-center text-muted-foreground mb-4">Peso inicial</p>
          )}

          {/* Progress bar */}
          <div className="relative mb-2">
            <div className="h-3 bg-surface rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{profile.peso_inicial.toFixed(1)} kg</span>
            <span className="text-primary font-medium">{progressPercent.toFixed(0)}% da meta</span>
            <span>{profile.meta_peso.toFixed(1)} kg</span>
          </div>

          <button
            onClick={() => navigate('/app/checkin')}
            className="mt-4 w-full py-2 border border-primary text-primary rounded-xl text-sm font-medium hover:bg-primary/10 transition-colors"
          >
            Atualizar peso
          </button>
        </div>

        {/* Card 2: Sua Jornada */}
        <div className="bg-surface rounded-2xl p-5">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground">{daysInProgram}</p>
              <p className="text-xs text-muted-foreground">dias</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Flame className="w-4 h-4 text-warning" />
              </div>
              <p className="text-2xl font-bold text-foreground">{streak}</p>
              <p className="text-xs text-muted-foreground">seguidos</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <CheckCircle className="w-4 h-4 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{checkins.length}</p>
              <p className="text-xs text-muted-foreground">registros</p>
            </div>
          </div>
          {streak >= 7 && (
            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-warning/20 text-warning text-xs font-medium rounded-full">
                <Flame className="w-3 h-3" /> Em chamas!
              </span>
            </div>
          )}
        </div>

        {/* Card 3: Checklist de Hoje */}
        <div className={`bg-surface rounded-2xl p-5 ${!todayCheckin ? 'border-2 border-warning animate-pulse' : ''}`}>
          <h3 className="font-bold text-foreground mb-3">Protocolo de hoje</h3>
          
          {protocoloCompleto ? (
            <div className="text-center py-4">
              <p className="text-primary font-semibold flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Arrasou hoje! 💪
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {[
                  { key: 'infusao', label: 'Tomei a infusão de boldina ☕', checked: todayCheckin?.infusao },
                  { key: 'cafe', label: 'Tomei o café ativador ☕', checked: todayCheckin?.cafe },
                  { key: 'esperou', label: 'Esperei 30min para comer ⏰', checked: todayCheckin?.esperou_30min },
                  { key: 'agua', label: 'Bebi 2L de água 💧', checked: todayCheckin?.agua_2l },
                ].map(item => (
                  <div key={item.key} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${item.checked ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
                      {item.checked && <CheckCircle className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    <span className={`text-sm ${item.checked ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">{protocoloCount} de 4 concluídos</p>
              {!todayCheckin && (
                <button
                  onClick={() => navigate('/app/checkin')}
                  className="mt-3 w-full py-2 bg-warning text-warning-foreground rounded-xl text-sm font-medium"
                >
                  Fazer check-in
                </button>
              )}
            </>
          )}
        </div>

        {/* Card 4: Acesso Rápido - O Método */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-medium">O Método</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: BookOpen, label: 'Receitas', path: '/app/receitas' },
              { icon: TrendingUp, label: 'Meu Progresso', path: '/app/historico' },
              { icon: Trophy, label: 'Conquistas', path: '/app/conquistas' },
              { icon: HelpCircle, label: 'Dúvidas', path: '/app/duvidas' },
            ].map(item => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-3 p-4 bg-surface rounded-xl hover:bg-surface/80 transition-colors"
              >
                <item.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Card 5: Área VIP */}
        <div>
          <p className="text-xs text-warning uppercase tracking-wider mb-3 font-medium">Área VIP</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Users, label: 'Comunidade', subtitle: 'Grupo exclusivo', path: '/app/comunidade', soon: true },
              { icon: Video, label: 'Vídeos', subtitle: 'Aulas e tutoriais', path: '/app/videos', soon: true },
              { icon: Gift, label: 'Bônus', subtitle: 'Presentes especiais', path: '/app/bonus', soon: true },
              { icon: MessageCircle, label: 'Suporte', subtitle: 'Fale conosco', path: '/app/suporte', soon: false },
            ].map(item => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="relative flex flex-col items-start p-4 bg-surface rounded-xl hover:bg-surface/80 transition-colors"
              >
                {item.soon && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-warning text-warning-foreground text-[10px] font-bold rounded-full">
                    EM BREVE
                  </span>
                )}
                <item.icon className={`w-5 h-5 ${item.soon ? 'text-warning' : 'text-primary'} mb-2`} />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.subtitle}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Card 6: Frase do Dia */}
        <div className="bg-surface rounded-2xl p-5 border-l-4 border-warning">
          <p className="text-muted-foreground italic text-sm leading-relaxed">
            "{fraseDodia}"
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
