import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Checkin } from '../types';

export function useCheckins(userId: string | undefined) {
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCheckins = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('checkins')
        .select('*')
        .eq('user_id', userId)
        .order('data', { ascending: false });

      if (error) throw error;
      setCheckins((data as Checkin[]) || []);
    } catch (error) {
      console.error('Error fetching checkins:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchCheckins();
  }, [fetchCheckins]);

  const createCheckin = async (checkinData: Omit<Checkin, 'id' | 'user_id' | 'created_at'>) => {
    if (!userId) return { error: new Error('No user ID') };

    try {
      const { data, error } = await supabase
        .from('checkins')
        .insert([{ ...checkinData, user_id: userId }])
        .select()
        .single();

      if (error) throw error;
      setCheckins(prev => [data as Checkin, ...prev]);
      return { data, error: null };
    } catch (error) {
      console.error('Error creating checkin:', error);
      return { error };
    }
  };

  const getTodayCheckin = (): Checkin | null => {
    const today = new Date().toISOString().split('T')[0];
    return checkins.find(c => c.data === today) || null;
  };

  const getLatestWeight = (): number | null => {
    return checkins.length > 0 ? checkins[0].peso : null;
  };

  const calculateStreak = (): number => {
    if (checkins.length === 0) return 0;

    const sortedCheckins = [...checkins].sort((a, b) => 
      new Date(b.data).getTime() - new Date(a.data).getTime()
    );

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedCheckins.length; i++) {
      const checkinDate = new Date(sortedCheckins[i].data);
      checkinDate.setHours(0, 0, 0, 0);

      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - i);

      if (checkinDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else if (i === 0) {
        // Check if yesterday has a checkin (allow starting streak from yesterday)
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        if (checkinDate.getTime() === yesterday.getTime()) {
          streak++;
        } else {
          break;
        }
      } else {
        break;
      }
    }

    return streak;
  };

  return {
    checkins,
    loading,
    createCheckin,
    getTodayCheckin,
    getLatestWeight,
    calculateStreak,
    refetch: fetchCheckins,
  };
}
