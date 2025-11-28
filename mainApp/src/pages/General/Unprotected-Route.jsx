import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

export default function UnprotectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
