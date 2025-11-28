import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}
