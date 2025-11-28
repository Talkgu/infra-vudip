import { useNavigate } from "react-router-dom";

export default function Welcome(){
    const navigate = useNavigate();
    
    function user(){
        localStorage.setItem("userType", "user");
        navigate("/login");
    }
    
    function consultant(){
        localStorage.setItem("userType", "consultant");
        navigate("/login-consultant");
    }

    return(
        <>
            <div className="welcome-card">
                <h1>¡Bienvenido a Vudip!</h1>
                <p>Tu compañero de bienestar emocional las 24 horas del día  para una vida más plena y consciente.</p>
                <button onClick={user} className="button-usuario-welcome">Quiero hablar</button>
                <button onClick={consultant} className="button-consultor-welcome">Soy consultor</button>
            </div>
        </>
    );
}