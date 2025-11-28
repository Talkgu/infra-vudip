import { useNavigate, Link } from "react-router-dom";
import DefaultLayout from "../../layout/Default-Layout";
import { useState } from "react";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import { service } from "../../services/api";
import { useAuth } from "../../auth/AuthProvider";
import { useUser } from "../../contexts/UserContext";
import FacebookLoginButton from "../../components/FacebookLoginButton";
import "../../styles/General/Home.css"
import "../../styles/User/Signup-Login.css"

export default function Login() {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Estado para manejar errores
    const navigate = useNavigate(); // Hook para navegar entre páginas
    const auth = useAuth(); // Hook para acceder al contexto de autenticación
    const { setUser, setUserId } = useUser(); // Hook para acceder al contexto de usuario


    // NO usar localStorage
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Hacer login: esto setea la cookie HttpOnly
            await service.loginUser(mail, password);

            // Llamar a /authme para verificar la sesión
            const session = await service.getAuthMe()

            if (session && session.data) {
                setUser(session.data.username || session.data.name); 
                setUserId(session.data.id || session.data._id);
                
                // Aquí podrías guardar algo de info básica que NO sea el token
                auth.setIsAuthenticated(true);
                navigate('/home');
            } else {
                throw new Error('No autenticado');
            }

        } catch (err) {
            console.error(err);
            setError("Error al iniciar sesión. Verifica tus datos.");
        }
    };

    return (
        <DefaultLayout>
            <div className="Login-card">
                <h1>Inicio de Sesión</h1>
                <p className="texto-donation">¡Bienvenido de nuevo! Por favor ingresa tus datos.</p>
                <form onSubmit={handleLogin}>
                    <label className="formulario__label">Correo electrónico</label>
                    <div className="formulario__grupo-input">
                        <input
                            type="email"
                            name="mail"
                            className="formulario__input"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            placeholder="correo@correo.com"
                            required
                        />
                    </div>


                    <label className="formulario__label">Contraseña</label>
                    <div className="formulario__grupo-input">
                        <input
                            type="password"
                            name="password"
                            className="formulario__input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="separador-form"><img src="src/img/Separador.png" alt="Separador" /></div>
                    <GoogleLoginButton />
                    <FacebookLoginButton />

                    {error && <p style={{ color: "red" }}>{error}</p>} {/* Muestra error si hay */}
                    <button type="submit" className="button-inicioSesion">Iniciar Sesión</button>

                </form>
            <div>
            </div>

            <h6>¿No tienes una cuenta?<Link to='/signup'> Regístrate</Link></h6>
            </div>
        </DefaultLayout>
    );
}
