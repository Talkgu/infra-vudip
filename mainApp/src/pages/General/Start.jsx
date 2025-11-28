import DefaultLayout from "../../layout/Default-Layout";
import { useAuth } from "../../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import Welcome from "../../components/Welcome";

export default function Start(){
    const auth = useAuth();

    // Mientras está cargando la sesión, no muestres nada
    if (auth.isLoading) {
        return null;
    }

    // Si ya cargó y estás autenticado, redirigí
    if (auth.isAuthenticated) {
        return <Navigate to='/home'/>;
    }

    // Si no estás autenticado, muestra la página normal
    return (
        <DefaultLayout>
            <Welcome/>
        </DefaultLayout>
    );
}