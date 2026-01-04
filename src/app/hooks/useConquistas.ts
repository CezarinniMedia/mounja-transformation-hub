import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Conquista, CONQUISTAS, UserStats } from '../types';

export function useConquistas(userId: string | undefined) {
  const [conquistas, setConquistas] = useState<Conquista[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConquistas = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('conquistas')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      setConquistas((data as Conquista[]) || []);
    } catch (error) {
      console.error('Error fetching conquistas:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchConquistas();
  }, [fetchConquistas]);

  const unlockConquista = async (conquistaId: string) => {
    if (!userId) return { error: new Error('No user ID') };

    // Check if already unlocked
    if (conquistas.some(c => c.conquista_id === conquistaId)) {
      return { data: null, error: null, alreadyUnlocked: true };
    }

    try {
      const { data, error } = await supabase
        .from('conquistas')
        .insert([{ user_id: userId, conquista_id: conquistaId }])
        .select()
        .single();

      if (error) throw error;
      setConquistas(prev => [...prev, data as Conquista]);
      return { data, error: null, alreadyUnlocked: false };
    } catch (error) {
      console.error('Error unlocking conquista:', error);
      return { error };
    }
  };

  const checkAndUnlockConquistas = async (stats: UserStats): Promise<string[]> => {
    const newlyUnlocked: string[] = [];

    for (const conquista of CONQUISTAS) {
      const isUnlocked = conquistas.some(c => c.conquista_id === conquista.id);
      
      if (!isUnlocked && conquista.condicao(stats)) {
        const result = await unlockConquista(conquista.id);
        if (result.data && !result.alreadyUnlocked) {
          newlyUnlocked.push(conquista.id);
        }
      }
    }

    return newlyUnlocked;
  };

  const isUnlocked = (conquistaId: string): boolean => {
    return conquistas.some(c => c.conquista_id === conquistaId);
  };

  const getUnlockedCount = (): number => {
    return conquistas.length;
  };

  return {
    conquistas,
    loading,
    unlockConquista,
    checkAndUnlockConquistas,
    isUnlocked,
    getUnlockedCount,
    refetch: fetchConquistas,
  };
}
