import DefaultLayout from "../../layout/Default-Layout";
import "../../styles/General/Home.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useState } from "react";
import { useSocket } from "../../contexts/SocketContext";

export default function Home() {
    const navigate = useNavigate();
    const [idRoom, setIdRoom] = useState<string>(""); 
    const { conectar } = useSocket();

    return (
        <DefaultLayout>
            <div className="general-content">
                <div className="general-card">
                    <h1>{`¡Bienvenido a Vudip!`}</h1>
                    <p>Este es el comienzo de tu viaje en el Bienestar emocional!</p>
                    
                    <button onClick={() => navigate("/WaitingRoom")}>
                        unirse a la sala de espera
                    </button>

                    <input
                        type="text"
                        value={idRoom}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>):void =>
                            setIdRoom(e.target.value)
                        }
                    />

                    <button
                        onClick={() => {
                            conectar(idRoom);
                            navigate(`/room/${idRoom}`);
                        }}
                    >
                        unirse a una Sala
                    </button>
                </div>
            </div>
        </DefaultLayout>
    );
}
