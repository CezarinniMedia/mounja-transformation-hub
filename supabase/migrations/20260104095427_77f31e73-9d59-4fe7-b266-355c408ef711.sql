-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  peso_inicial DECIMAL(5,1) NOT NULL,
  meta_peso DECIMAL(5,1) NOT NULL,
  data_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
  cintura_inicial DECIMAL(5,1),
  quadril_inicial DECIMAL(5,1),
  modo TEXT NOT NULL DEFAULT 'ativo' CHECK (modo IN ('ativo', 'manutencao')),
  notificacoes BOOLEAN NOT NULL DEFAULT true,
  animacoes BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create checkins table for daily check-ins
CREATE TABLE public.checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  data DATE NOT NULL,
  peso DECIMAL(5,1) NOT NULL,
  cintura DECIMAL(5,1),
  quadril DECIMAL(5,1),
  infusao BOOLEAN NOT NULL DEFAULT false,
  cafe BOOLEAN NOT NULL DEFAULT false,
  esperou_30min BOOLEAN NOT NULL DEFAULT false,
  agua_2l BOOLEAN NOT NULL DEFAULT false,
  humor INTEGER CHECK (humor >= 1 AND humor <= 5),
  anotacao TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, data)
);

-- Create conquistas table for achievements
CREATE TABLE public.conquistas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  conquista_id TEXT NOT NULL,
  desbloqueado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, conquista_id)
);

-- Create receitas_vistas table
CREATE TABLE public.receitas_vistas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receita_id TEXT NOT NULL,
  visto_em TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, receita_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conquistas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receitas_vistas ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for checkins
CREATE POLICY "Users can view their own checkins" 
ON public.checkins FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own checkins" 
ON public.checkins FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own checkins" 
ON public.checkins FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own checkins" 
ON public.checkins FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for conquistas
CREATE POLICY "Users can view their own conquistas" 
ON public.conquistas FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own conquistas" 
ON public.conquistas FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for receitas_vistas
CREATE POLICY "Users can view their own receitas_vistas" 
ON public.receitas_vistas FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own receitas_vistas" 
ON public.receitas_vistas FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();