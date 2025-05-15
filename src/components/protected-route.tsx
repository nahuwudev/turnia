import { useAuthStore } from "@/store/auth-store";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
