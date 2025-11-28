import { useState } from "react";
import DefaultLayout from "../../layout/Default-Layout";
import { service } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import "../../styles/General/Token.css"

export default function Token(){
    const [token, setToken] = useState('');
    const [error, setError] = useState(null);
    const auth = useAuth();
    const navigate = useNavigate();

    const handleToken = async (e) => {
            e.preventDefault(); // Evita el envío del formulario por defecto
            const usuario = JSON.parse(localStorage.getItem("user"));
            if (localStorage.getItem("userType") == "user"){
                try {
                    const tokenIsAsociated = await service.registerUser(usuario.username, usuario.mail, usuario.password, token);

                    if (tokenIsAsociated) {
                        auth.setIsAuthenticated(true);
                        navigate('/home');
                    }
                } catch (err) {
                    setError("Error al verificar token. Verifica que el token ingresado sea correcto.");
                }
            }
            else if (localStorage.getItem("userType") == "consultant"){
                try {
                    localStorage.setItem("token", token);
                    navigate('/webcam');
                } catch (err) {
                    setError("Error al verificar token. Verifica que el token ingresado sea correcto.");
                }
            }

        };

    return (
        <DefaultLayout>
            <div className="token-container">
                <h1>Ingrese su Token</h1>
                <form onSubmit={handleToken}>
                <input
                        type="text"
                        name="token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        required
                        />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                <button>Validar</button>
                </form>
            </div>
        </DefaultLayout>
    );
}