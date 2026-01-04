import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ReceitaVista } from '../types';

export function useReceitasVistas(userId: string | undefined) {
  const [receitasVistas, setReceitasVistas] = useState<ReceitaVista[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReceitasVistas = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('receitas_vistas')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      setReceitasVistas((data as ReceitaVista[]) || []);
    } catch (error) {
      console.error('Error fetching receitas vistas:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchReceitasVistas();
  }, [fetchReceitasVistas]);

  const markAsViewed = async (receitaId: string) => {
    if (!userId) return { error: new Error('No user ID') };

    // Check if already viewed
    if (receitasVistas.some(r => r.receita_id === receitaId)) {
      return { data: null, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('receitas_vistas')
        .insert([{ user_id: userId, receita_id: receitaId }])
        .select()
        .single();

      if (error) throw error;
      setReceitasVistas(prev => [...prev, data as ReceitaVista]);
      return { data, error: null };
    } catch (error) {
      console.error('Error marking receita as viewed:', error);
      return { error };
    }
  };

  const isViewed = (receitaId: string): boolean => {
    return receitasVistas.some(r => r.receita_id === receitaId);
  };

  const getViewedCount = (): number => {
    return receitasVistas.length;
  };

  return {
    receitasVistas,
    loading,
    markAsViewed,
    isViewed,
    getViewedCount,
    refetch: fetchReceitasVistas,
  };
}
