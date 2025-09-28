import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Profile } from '../types/database';

interface UseProfileReturn {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  refetchProfile: () => Promise<void>;
}

export const useCurrentUserProfile = (userId?: string): UseProfileReturn => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (id?: string) => {
    if (!id) {
      setLoading(false);
      return;
      console.log('Print data', id);
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('profiles')
        .select('id, profile_name, email, created_at')
        .eq('id', id)
        .single(); // Use .single() to get one record instead of an array

      if (error) {
        console.log('Error fetching profile:', error);
        throw new Error(error.message);
      }

      setProfile(data);
      console.log('Fetched profile:', data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const refetchProfile = async () => {
    await fetchProfile(userId);
  };

  useEffect(() => {
    fetchProfile(userId);
  }, [userId]);

  return {
    profile,
    loading,
    error,
    refetchProfile
  };
};
