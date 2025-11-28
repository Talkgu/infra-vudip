import { useAuth } from "../auth/AuthProvider";
import { useUser } from "../contexts/UserContext";
import { service } from "../services/api.js";

export default function LogoutButton() {
    const auth = useAuth();
    const { setUser, setUserId } = useUser();

    const handleLogout = async () => {
        await service.logout_user();
        // Clear user context
        setUser(null);
        setUserId(null);
        await auth.logout();
    };

    return (
        <button className="custom-botton-donation" onClick={handleLogout}>
            Cerrar Sesión
        </button>
    );
}