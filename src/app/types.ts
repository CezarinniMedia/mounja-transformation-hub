// Types for Mounja Natural App

export interface Profile {
  id: string;
  user_id: string;
  nome: string;
  peso_inicial: number;
  meta_peso: number;
  data_inicio: string;
  cintura_inicial: number | null;
  quadril_inicial: number | null;
  modo: 'ativo' | 'manutencao';
  notificacoes: boolean;
  animacoes: boolean;
  created_at: string;
  updated_at: string;
}

export interface Checkin {
  id: string;
  user_id: string;
  data: string;
  peso: number;
  cintura: number | null;
  quadril: number | null;
  infusao: boolean;
  cafe: boolean;
  esperou_30min: boolean;
  agua_2l: boolean;
  humor: number | null;
  anotacao: string | null;
  created_at: string;
}

export interface Conquista {
  id: string;
  user_id: string;
  conquista_id: string;
  desbloqueado_em: string;
}

export interface ConquistaDefinition {
  id: string;
  nome: string;
  descricao: string;
  emoji: string;
  categoria: 'primeiros_passos' | 'streak' | 'peso' | 'protocolo' | 'bem_estar' | 'tempo';
  condicao: (stats: UserStats) => boolean;
}

export interface UserStats {
  totalCheckins: number;
  streak: number;
  pesoPerdido: number;
  diasNoPrograma: number;
  receitasVistas: number;
  anotacoesFeitas: number;
  diasComAgua: number;
  diasBemEstar: number;
  dias4de4: number;
}

export interface ReceitaVista {
  id: string;
  user_id: string;
  receita_id: string;
  visto_em: string;
}

// Conquistas definitions
export const CONQUISTAS: ConquistaDefinition[] = [
  // Primeiros Passos
  { id: 'primeiro_passo', nome: 'Primeiro Passo', descricao: 'Toda jornada começa com um passo', emoji: '🌟', categoria: 'primeiros_passos', condicao: (s) => s.totalCheckins >= 1 },
  { id: 'estudante', nome: 'Estudante', descricao: 'Conhecimento é poder', emoji: '📖', categoria: 'primeiros_passos', condicao: (s) => s.receitasVistas >= 2 },
  { id: 'inicio', nome: 'Início', descricao: 'O começo da mudança', emoji: '⚖️', categoria: 'primeiros_passos', condicao: (s) => s.totalCheckins >= 1 },
  
  // Streak
  { id: 'em_chamas', nome: 'Em Chamas', descricao: 'O fogo da transformação', emoji: '🔥', categoria: 'streak', condicao: (s) => s.streak >= 3 },
  { id: 'consistente', nome: 'Consistente', descricao: 'Uma semana de dedicação', emoji: '💪', categoria: 'streak', condicao: (s) => s.streak >= 7 },
  { id: 'guerreira', nome: 'Guerreira', descricao: 'Duas semanas imbatível', emoji: '🏆', categoria: 'streak', condicao: (s) => s.streak >= 14 },
  { id: 'imparavel', nome: 'Imparável', descricao: 'Um mês inteiro!', emoji: '👑', categoria: 'streak', condicao: (s) => s.streak >= 30 },
  { id: 'lendaria', nome: 'Lendária', descricao: 'Dois meses de foco', emoji: '💎', categoria: 'streak', condicao: (s) => s.streak >= 60 },
  { id: 'imortal', nome: 'Imortal', descricao: 'Você é inspiração!', emoji: '🌟', categoria: 'streak', condicao: (s) => s.streak >= 100 },
  
  // Peso
  { id: 'primeiro_kg', nome: 'Primeiro Kg', descricao: 'Começou!', emoji: '⚡', categoria: 'peso', condicao: (s) => s.pesoPerdido >= 1 },
  { id: 'focada', nome: 'Focada', descricao: 'Foco dando resultado', emoji: '🎯', categoria: 'peso', condicao: (s) => s.pesoPerdido >= 3 },
  { id: 'decolando', nome: 'Decolando', descricao: 'Ninguém te segura!', emoji: '🚀', categoria: 'peso', condicao: (s) => s.pesoPerdido >= 5 },
  { id: 'transformacao', nome: 'Transformação', descricao: 'Uma nova você', emoji: '🌈', categoria: 'peso', condicao: (s) => s.pesoPerdido >= 10 },
  { id: 'estrela', nome: 'Estrela', descricao: 'Brilhando!', emoji: '⭐', categoria: 'peso', condicao: (s) => s.pesoPerdido >= 15 },
  { id: 'campea', nome: 'Campeã', descricao: 'Incrível!', emoji: '🏅', categoria: 'peso', condicao: (s) => s.pesoPerdido >= 20 },
  
  // Protocolo
  { id: 'hidratada', nome: 'Hidratada', descricao: 'Corpo agradece', emoji: '💧', categoria: 'protocolo', condicao: (s) => s.diasComAgua >= 14 },
  { id: 'perfeicao', nome: 'Perfeição', descricao: 'Execução impecável', emoji: '⭐', categoria: 'protocolo', condicao: (s) => s.dias4de4 >= 7 },
  { id: 'disciplinada', nome: 'Disciplinada', descricao: 'Mestre do método', emoji: '🎖️', categoria: 'protocolo', condicao: (s) => s.dias4de4 >= 30 },
  { id: 'observadora', nome: 'Observadora', descricao: 'Registrando tudo', emoji: '📝', categoria: 'protocolo', condicao: (s) => s.anotacoesFeitas >= 10 },
  
  // Bem-estar
  { id: 'positividade', nome: 'Positividade', descricao: 'Energia positiva!', emoji: '😊', categoria: 'bem_estar', condicao: (s) => s.diasBemEstar >= 7 },
  { id: 'florescendo', nome: 'Florescendo', descricao: 'Desabrochando', emoji: '🌸', categoria: 'bem_estar', condicao: (s) => s.diasBemEstar >= 14 },
  { id: 'radiante', nome: 'Radiante', descricao: 'Brilhando!', emoji: '☀️', categoria: 'bem_estar', condicao: (s) => s.diasBemEstar >= 30 },
  
  // Tempo
  { id: 'uma_semana', nome: '1 Semana', descricao: 'Primeira semana!', emoji: '📅', categoria: 'tempo', condicao: (s) => s.diasNoPrograma >= 7 },
  { id: 'um_mes', nome: '1 Mês', descricao: 'Um mês!', emoji: '🗓️', categoria: 'tempo', condicao: (s) => s.diasNoPrograma >= 30 },
  { id: 'tres_meses', nome: '3 Meses', descricao: 'Trimestre!', emoji: '🎂', categoria: 'tempo', condicao: (s) => s.diasNoPrograma >= 90 },
  { id: 'seis_meses', nome: '6 Meses', descricao: 'Meio ano!', emoji: '🏰', categoria: 'tempo', condicao: (s) => s.diasNoPrograma >= 180 },
  { id: 'um_ano', nome: '1 Ano', descricao: 'Um ano!', emoji: '🎊', categoria: 'tempo', condicao: (s) => s.diasNoPrograma >= 365 },
];

export const FRASES_MOTIVACIONAIS = [
  "Cada dia é um passo mais perto do seu objetivo!",
  "Você está fazendo um trabalho incrível!",
  "Lembre-se: progresso, não perfeição!",
  "Sua dedicação está valendo a pena!",
  "O seu EU do futuro vai te agradecer!",
  "Seu estômago está virando uma máquina!",
  "Você é mais forte do que imagina!",
  "Continue assim, guerreira!",
  "A versão magra de você está chegando!",
  "Não desista, você já começou!",
  "Cada gota de suor vale ouro!",
  "Hoje é o dia que faz diferença!",
  "Você merece se sentir bem!",
  "A mudança começa de dentro para fora!",
  "Pequenos passos levam a grandes resultados!",
  "Confie no processo!",
  "Você está no caminho certo!",
  "Sua força é inspiradora!",
  "Mantenha o foco, a vitória está perto!",
  "Cada dia conta, cada esforço vale!",
];
