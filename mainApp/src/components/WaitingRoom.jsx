import { useEffect, useState, useRef } from "react" 
import { useNavigate } from "react-router-dom" 
import { service } from "../services/api" 
import { io } from "socket.io-client" 
import { useUser } from "../contexts/UserContext"
import { toasty } from "../utils/toast"
import "../styles/General/WaitingRoom.css"


export default function WaitingRoom() {
    const [cantidadUsuarios, setCantidadUsuarios] = useState(0) 
    const [usuarios, setUsuarios] = useState([]) 
    const [activeSocket, setActiveSocket] = useState(null) 
    const {userId} = useUser()

    const [roomId, setRoomId] = useState(null)
    const [isCreating, setIsCreating] = useState(false)
    const hasCreated = useRef(false) // Para evitar doble creación

    const navigate = useNavigate() 

    const fetchInitialData = async () => {
        try {
            const resCantidad = await service.getWaitingRoomUsers()
            const resUsuarios = await service.getWaitingRoomListUsers()
            

            setCantidadUsuarios(resCantidad.data)
            setUsuarios(resUsuarios.data)
        } catch (error) {
            console.error("Error al cargar datos", error)
        }
    } 
useEffect(() => {
    if (!userId) {
    console.warn("No se encontró userId, no conecto el socket")
    return}
    const crearSala = async () => {
            // Evitar múltiples llamadas
            if (hasCreated.current || isCreating) return;
            
            hasCreated.current = true;
            setIsCreating(true);
            
            try {
                const response = await service.createRoom();
                toasty.emoji("✅",`Sala creada ${response.data.roomId}` );
                setRoomId(response.data);
            } catch (error) {
                console.error("Error al crear la sala:", error);
                hasCreated.current = false; // Permitir reintentos en caso de error
            } finally {
                setIsCreating(false);
            }
        }
    crearSala();
    
    fetchInitialData() 
    let socket
    if (!activeSocket) {
        socket = io("http://localhost:8000/waiting-room", {
            query: { userId: String(userId) },
            transports: ["websocket"]
        }) 
        setActiveSocket(true)

        socket.on("connect", () => {
        toasty.emoji("✅","usted ha ingresado a la sala de espera")
        })

        socket.on("disconnect", () => {
            toasty.error("Desconectado de sala de espera")
        })

        socket.on("connect_error", (error) => {
        toasty.emoji("⚠️", " Error de conexión")
        })

        // Evento que manda el back cuando encuentra una sala
        socket.on("pair-found", (roomId) => {
        toasty.emoji("🎉", `Sala encontrada: ${roomId}`)

        navigate(`/room/${roomId}`)})
        
    
        }
        

    const intervalId = setInterval(() => {
            fetchInitialData() 
        }, 5000)  

    return () => {
        if (socket) {
            socket.disconnect() 
            clearInterval(intervalId) 
        }
    } 
}, []) 

    return (
        <div className="body">
        <h1>Sala de Espera</h1>
        <h2>Usuarios conectados: {cantidadUsuarios ||  "..."}</h2>
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <ul>

            {cantidadUsuarios ? (
            usuarios.map((u, index) => <li key={index}>{u}</li>)
            ) : (
            <h1>Cargando usuarios...</h1>
            )}
        </ul>
            </div>
    ) 
    }