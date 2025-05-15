import { create } from "zustand";
import { persist } from "zustand/middleware";
import supabase from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import { Database } from "@/lib/database.types";

type Profile = Database["public"]["Views"]["user_details_view"]["Row"] | null;

interface AuthState {
  user: User | null;
  profile: Profile;
  session: Session | null;
  isAuthenticated: boolean;
  loading: boolean;
  initialize: () => Promise<void>;
  setAuth: (session: Session | null, profile?: Profile) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      profile: null,
      isAuthenticated: false,
      loading: true,
      initialize: async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        let profile: Profile = null;
        if (session?.user) {
          const { data, error } = await supabase
            .rpc("get_user_details", {"p_user_id": session.user.id})
            .single();

          if (error) {
            console.error("Error cargando perfil:", error.message);
          } else {
            profile = data;
          }
        }

        set({
          session,
          user: session?.user ?? null,
          profile,
          isAuthenticated: !!session,
          loading: false,
        });

        // Escuchar cambios de autenticación
        supabase.auth.onAuthStateChange(async (event, session) => {
          let profile: Profile = null;

          if (session?.user && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
            const { data, error } = await supabase
              .rpc("get_user_details", { p_user_id: session.user.id })
              .single();

            if (error) {
              console.error("Error cargando perfil en onAuthStateChange:", error.message);
            } else {
              profile = data;
            }
          }

          set({
            session,
            profile,
            user: session?.user ?? null,
            isAuthenticated: !!session,
            loading: false,
          });
        });
      },
      setAuth: (session, profile) => {
        set({
          session,
          profile: profile ?? null,
          user: session?.user ?? null,
          isAuthenticated: !!session,
          loading: false,
        });
      },
      logout: async () => {
        await supabase.auth.signOut();
        set({
          session: null,
          profile: null,
          user: null,
          isAuthenticated: false,
          loading: false,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
