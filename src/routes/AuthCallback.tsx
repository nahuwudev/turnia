import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import supabase from '@/lib/supabase';

import { directories } from '@/lib/directorios';
import { useProfile } from '@/hooks/use-profile';

function AuthCallback() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { data: profile, isLoading: profileLoading } = useProfile(userId);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading || profileLoading) return;

    if (!userId) {
      navigate(directories.login.url, { state: { error: 'No se pudo autenticar' } });
      return;
    }

    if (!profile) {
      navigate(directories.register.url, { state: { error: 'Error al cargar perfil' } });
      return;
    }

    navigate(directories.dashboard.url, { replace: true });
  }, [navigate, userId, profile, loading, profileLoading]);

  return <div>Loading.. AuthCallback.</div>;
}

export default AuthCallback;