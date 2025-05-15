import { useEffect } from "react";
import { useNavigate } from "react-router";
import supabase from "@/lib/supabase";
import { useAuthStore } from "@/store/auth-store";
import { directories } from "@/lib/directorios";

function AuthCallback() {
  const navigate = useNavigate();
  const { loading, isAuthenticated, setAuth } = useAuthStore();

  useEffect(() => {
    async function handleAuthCallback() {
      if (loading) return;

      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        console.error("Error en callback:", error?.message);
        navigate(directories.login.url, { state: { error: error?.message } });
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .rpc("get_user_details", { p_user_id: data.session.user.id })
        .single();

      if (profileError) {
        console.error("Error cargando perfil:", profileError.message);
        navigate(directories.register.url, {
          state: { error: "Error al cargar perfil" },
        });
        return;
      }

      setAuth(data.session, profileData);

      navigate(directories.dashboard.url, { replace: true });
    }
    handleAuthCallback();
  }, [navigate, isAuthenticated, loading, setAuth]);

  return <div>Loading.. AuthCallback.</div>;
}

export default AuthCallback;
