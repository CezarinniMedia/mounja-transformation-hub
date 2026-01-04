import React, { createContext, useContext, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { useCheckins } from '../hooks/useCheckins';
import { useConquistas } from '../hooks/useConquistas';
import { useReceitasVistas } from '../hooks/useReceitasVistas';
import { Profile, Checkin, UserStats, FRASES_MOTIVACIONAIS } from '../types';

interface AppContextType {
  // Auth
  user: ReturnType<typeof useAuth>['user'];
  session: ReturnType<typeof useAuth>['session'];
  authLoading: boolean;
  signUp: ReturnType<typeof useAuth>['signUp'];
  signIn: ReturnType<typeof useAuth>['signIn'];
  signOut: ReturnType<typeof useAuth>['signOut'];
  
  // Profile
  profile: Profile | null;
  profileLoading: boolean;
  createProfile: ReturnType<typeof useProfile>['createProfile'];
  updateProfile: ReturnType<typeof useProfile>['updateProfile'];
  refetchProfile: ReturnType<typeof useProfile>['refetch'];
  
  // Checkins
  checkins: Checkin[];
  checkinsLoading: boolean;
  createCheckin: ReturnType<typeof useCheckins>['createCheckin'];
  getTodayCheckin: ReturnType<typeof useCheckins>['getTodayCheckin'];
  getLatestWeight: ReturnType<typeof useCheckins>['getLatestWeight'];
  calculateStreak: ReturnType<typeof useCheckins>['calculateStreak'];
  refetchCheckins: ReturnType<typeof useCheckins>['refetch'];
  
  // Conquistas
  conquistas: ReturnType<typeof useConquistas>['conquistas'];
  conquistasLoading: boolean;
  checkAndUnlockConquistas: ReturnType<typeof useConquistas>['checkAndUnlockConquistas'];
  isConquistaUnlocked: ReturnType<typeof useConquistas>['isUnlocked'];
  getUnlockedCount: ReturnType<typeof useConquistas>['getUnlockedCount'];
  
  // Receitas
  receitasVistas: ReturnType<typeof useReceitasVistas>['receitasVistas'];
  markReceitaAsViewed: ReturnType<typeof useReceitasVistas>['markAsViewed'];
  isReceitaViewed: ReturnType<typeof useReceitasVistas>['isViewed'];
  getReceitasViewedCount: ReturnType<typeof useReceitasVistas>['getViewedCount'];
  
  // Computed
  stats: UserStats;
  currentWeight: number;
  weightLost: number;
  progressPercent: number;
  daysInProgram: number;
  fraseDodia: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const profile = useProfile(auth.user?.id);
  const checkins = useCheckins(auth.user?.id);
  const conquistas = useConquistas(auth.user?.id);
  const receitasVistas = useReceitasVistas(auth.user?.id);

  const computed = useMemo(() => {
    const currentWeight = checkins.getLatestWeight() || profile.profile?.peso_inicial || 0;
    const pesoInicial = profile.profile?.peso_inicial || 0;
    const metaPeso = profile.profile?.meta_peso || 0;
    const weightLost = pesoInicial - currentWeight;
    
    const progressPercent = pesoInicial > metaPeso 
      ? Math.min(100, Math.max(0, ((pesoInicial - currentWeight) / (pesoInicial - metaPeso)) * 100))
      : 0;

    const dataInicio = profile.profile?.data_inicio 
      ? new Date(profile.profile.data_inicio) 
      : new Date();
    const hoje = new Date();
    const daysInProgram = Math.floor((hoje.getTime() - dataInicio.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const checkinsArray = checkins.checkins;
    const diasComAgua = checkinsArray.filter(c => c.agua_2l).length;
    const diasBemEstar = checkinsArray.filter(c => c.humor && c.humor >= 4).length;
    const dias4de4 = checkinsArray.filter(c => c.infusao && c.cafe && c.esperou_30min && c.agua_2l).length;
    const anotacoesFeitas = checkinsArray.filter(c => c.anotacao && c.anotacao.trim()).length;

    const stats: UserStats = {
      totalCheckins: checkinsArray.length,
      streak: checkins.calculateStreak(),
      pesoPerdido: Math.max(0, weightLost),
      diasNoPrograma: daysInProgram,
      receitasVistas: receitasVistas.getViewedCount(),
      anotacoesFeitas,
      diasComAgua,
      diasBemEstar,
      dias4de4,
    };

    const fraseDodia = FRASES_MOTIVACIONAIS[daysInProgram % FRASES_MOTIVACIONAIS.length];

    return {
      currentWeight,
      weightLost,
      progressPercent,
      daysInProgram,
      stats,
      fraseDodia,
    };
  }, [profile.profile, checkins, receitasVistas]);

  const value: AppContextType = {
    // Auth
    user: auth.user,
    session: auth.session,
    authLoading: auth.loading,
    signUp: auth.signUp,
    signIn: auth.signIn,
    signOut: auth.signOut,
    
    // Profile
    profile: profile.profile,
    profileLoading: profile.loading,
    createProfile: profile.createProfile,
    updateProfile: profile.updateProfile,
    refetchProfile: profile.refetch,
    
    // Checkins
    checkins: checkins.checkins,
    checkinsLoading: checkins.loading,
    createCheckin: checkins.createCheckin,
    getTodayCheckin: checkins.getTodayCheckin,
    getLatestWeight: checkins.getLatestWeight,
    calculateStreak: checkins.calculateStreak,
    refetchCheckins: checkins.refetch,
    
    // Conquistas
    conquistas: conquistas.conquistas,
    conquistasLoading: conquistas.loading,
    checkAndUnlockConquistas: conquistas.checkAndUnlockConquistas,
    isConquistaUnlocked: conquistas.isUnlocked,
    getUnlockedCount: conquistas.getUnlockedCount,
    
    // Receitas
    receitasVistas: receitasVistas.receitasVistas,
    markReceitaAsViewed: receitasVistas.markAsViewed,
    isReceitaViewed: receitasVistas.isViewed,
    getReceitasViewedCount: receitasVistas.getViewedCount,
    
    // Computed
    ...computed,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
