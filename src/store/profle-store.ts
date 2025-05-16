import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import supabase from '@/lib/supabase';
import { Database } from '@/lib/database.types';

type Profile = Database['public']['Views']['user_details_view']['Row'] | null;

interface ProfileState {
  profile: Profile;
  loading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  setProfile: (profile: Profile) => void;
  clearProfile: () => void;
}

export const useStoreProfile = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      loading: true,
      error: null,
      initialize: async () => {
        set({ loading: true, error: null });
        try {
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          if (sessionError) {
            set({ error: sessionError.message, loading: false });
            return;
          }

          if (!session?.user) {
            set({ profile: null, loading: false });
            return;
          }

          const { data, error } = await supabase
            .rpc('get_user_details', { p_user_id: session.user.id })
            .single();

          if (error) {
            set({ error: error.message, loading: false });
            return;
          }

          set({ profile: data, loading: false });
        } catch (err) {
          set({ error: err instanceof Error ? err.message : 'Error desconocido', loading: false });
        }
      },
      setProfile: (profile) => set({ profile, loading: false, error: null }),
      clearProfile: () => set({ profile: null, loading: false, error: null }),
    }),
    {
      name: 'profile-storage',
      partialize: (state) => ({ profile: state.profile }), // Solo persiste el profile
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state, version } = JSON.parse(str);

          const now = Date.now();
          const oneDay = 1000 * 60 * 60 * 24;
          if (!state?.profile?.updated_at || now - new Date(state.profile.updated_at).getTime() > oneDay) {
            localStorage.removeItem(name);
            return null;
          }
          return { state, version };
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);