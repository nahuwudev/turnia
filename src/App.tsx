import { Route, Routes } from "react-router";
import DashboardLayout from "./layout/DashboardLayout";
import { directories } from "./lib/directorios";

import {
  Notification,
  Dashboard,
  Calendario,
  Clientes,
  Facturacion,
  Home,
  Informes,
  Profile,
  Disponibility,
} from "./routes";
import Login from "./routes/Login";
import { ProtectedRoute } from "./components/protected-route";
import AuthCallback from "./routes/AuthCallback";
import { Register } from "./routes/register";
import { useStoreProfile } from "./store/profle-store";
import { useEffect } from "react";
import supabase from "./lib/supabase";
import { useStoreAppointments } from "./store/appointments-store";

function App() {
  const { initialize: initializeProfile, clearProfile } = useStoreProfile();
  const { initialize: initializeAppointments, clearAppointments } =
    useStoreAppointments();

  useEffect(() => {
    initializeProfile();
    initializeAppointments();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          initializeProfile();
          initializeAppointments();
        } else if (event === "SIGNED_OUT") {
          clearProfile();
          clearAppointments();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [
    initializeProfile,
    clearProfile,
    initializeAppointments,
    clearAppointments,
  ]);

  return (
    <Routes>
      <Route path={directories.home.url} element={<Home />} />
      <Route path={directories.login.url} element={<Login />} />
      <Route path={directories.register.url} element={<Register />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Protected Route - Dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route path={directories.dashboard.url} element={<DashboardLayout />}>
          {/* Menu */}
          <Route index element={<Dashboard />} />
          <Route path={directories.calendario.url} element={<Calendario />} />
          <Route path={directories.informes.url} element={<Informes />} />
          <Route path={directories.facturacion.url} element={<Facturacion />} />
          <Route path={directories.clientes.url} element={<Clientes />} />
          {/* Configuracion */}
          <Route path={directories.profile.url} element={<Profile />} />
          <Route
            path={directories.notification.url}
            element={<Notification />}
          />
          <Route
            path={directories.disponibility.url}
            element={<Disponibility />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
