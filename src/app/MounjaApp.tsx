import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { SplashScreen } from './pages/SplashScreen';
import { AuthPage } from './pages/AuthPage';
import { BemVinda } from './pages/BemVinda';
import { Configurar } from './pages/Configurar';
import { ConfigurarMedidas } from './pages/ConfigurarMedidas';
import { Pronta } from './pages/Pronta';
import { Dashboard } from './pages/Dashboard';
import { Checkin } from './pages/Checkin';
import { Historico } from './pages/Historico';
import { Conquistas } from './pages/Conquistas';
import { Receitas } from './pages/Receitas';
import { ReceitaDetalhe } from './pages/ReceitaDetalhe';
import { Duvidas } from './pages/Duvidas';
import { VipHub } from './pages/VipHub';
import { Comunidade } from './pages/Comunidade';
import { Videos } from './pages/Videos';
import { Bonus } from './pages/Bonus';
import { Perfil } from './pages/Perfil';
import { Suporte } from './pages/Suporte';
import { Metodo } from './pages/Metodo';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, authLoading, profile, profileLoading } = useApp();

  if (authLoading || profileLoading) {
    return <SplashScreen />;
  }

  if (!user) {
    return <Navigate to="/app/auth" replace />;
  }

  if (!profile) {
    return <Navigate to="/app/bem-vinda" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/bem-vinda" element={<BemVinda />} />
      <Route path="/configurar" element={<Configurar />} />
      <Route path="/configurar-medidas" element={<ConfigurarMedidas />} />
      <Route path="/pronta" element={<Pronta />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/checkin" element={<ProtectedRoute><Checkin /></ProtectedRoute>} />
      <Route path="/historico" element={<ProtectedRoute><Historico /></ProtectedRoute>} />
      <Route path="/conquistas" element={<ProtectedRoute><Conquistas /></ProtectedRoute>} />
      <Route path="/receitas" element={<ProtectedRoute><Receitas /></ProtectedRoute>} />
      <Route path="/receitas/:id" element={<ProtectedRoute><ReceitaDetalhe /></ProtectedRoute>} />
      <Route path="/duvidas" element={<ProtectedRoute><Duvidas /></ProtectedRoute>} />
      <Route path="/metodo" element={<ProtectedRoute><Metodo /></ProtectedRoute>} />
      <Route path="/vip" element={<ProtectedRoute><VipHub /></ProtectedRoute>} />
      <Route path="/comunidade" element={<ProtectedRoute><Comunidade /></ProtectedRoute>} />
      <Route path="/videos" element={<ProtectedRoute><Videos /></ProtectedRoute>} />
      <Route path="/bonus" element={<ProtectedRoute><Bonus /></ProtectedRoute>} />
      <Route path="/suporte" element={<ProtectedRoute><Suporte /></ProtectedRoute>} />
      <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export function MounjaApp() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
