import { useNavigate } from "react-router-dom";
import DefaultLayout from "../../layout/Default-Layout";
import { useState } from "react";
import { Link } from "react-router-dom";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import "../../styles/User/Signup-Login.css"
import "../../styles/General/Home.css"
import { service } from "../../services/api";
import Token from "../General/Token";

export default function Signup(){
    const [username, setUsername] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            localStorage.setItem("user", JSON.stringify({ username, mail, password }));
            navigate("/token");
            // Si el backend devolvió Set-Cookie, el navegador la guarda automáticamente
            
        } catch (err) {
            console.error("Error al registrarse", err);
        }
    };
    return (
        <DefaultLayout>
            <div className="Signup-card">
                <h1>Registrate</h1>
                <p className="texto-donation"> Crea una cuenta para comenzar tu viaje en el bienestar emocional.</p>
                <form onSubmit={handleSubmit}>

                    <label className="formulario__label">Nombre de Usuario</label>
                    <div className="formulario__grupo-input">
                        <input
                            type="text"
                            name="username"
                            className="formulario__input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="TuNombre123"
                            required
                        />
                    </div>

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

                    <button type="submit" className="button-registro">Registrar</button>
                </form>


                <h6>¿Ya tenés una cuenta? <Link to='/login'>Inicia sesión</Link></h6>
            </div>
        </DefaultLayout>
    );
}
