import { createContext, useContext, useRef, useState,  } from "react";
import { useUser } from "./UserContext";
import { io } from "socket.io-client"
import { toasty } from "../utils/toast.jsx"
//futuro import el userProvider ajaj
const SocketContext = createContext()

export function SocketProvider({ children  }){
    const [messages, setmessagess] = useState([])
    const [connected, setConnected]= useState(false)
    const socketRef = useRef(null)
    const { user, userId, setUser, setUserId } = useUser(); // Get user data from context

    const conectar = (roomId)=>{
        if (socketRef.current) {socketRef.current.disconnect()}

        const socket = io("ws://localhost:8000/room",{
            query: { roomId, userId: userId }, transports:["websocket"],
    })
    socket.on("connect", ()=>{
        setConnected(true)
        toasty.success(`Se ha conectado con éxito al room: ${roomId}`)
    } )
    
    socket.on("user-joined",({ userId })=>{
        toasty.emoji("🙋‍♂️",`${userId} se ha unido  a la sala ` )
    })

    socket.on('receive-message', ({ userId, message }) => {
        userId != userId ? toasty.emoji("📢", `el usuario ${userId} envió un mensaje`,{autoClose:1500}) : null

        setmessagess(m => [...m, { senderId: userId, content: message }]);
    });

    socket.on("room-error",({message})=>{
        toasty.error(message)
        disconnect()
    })

    socket.on("user-left", ({ userId })=>{
        toasty.emoji("🏃‍♂️",`el usuario ${userId} se ha retirado`)
    })

    socket.on("disconnect",()=>{
        toasty.emoji("❌","se desconectó el socket")
        setConnected(false)
    })
    socketRef.current = socket
    }


    const sendMessages = (content) => {
        if (!socketRef.current) return;
        socketRef.current.emit('send-message', { message: content });

    };

    const disconnect = () => {
        socketRef.current?.disconnect();
        socketRef.current = null;
        setConnected(false)
        setmessagess([]);
    };
    
    return (
    <SocketContext.Provider value={{conectar, messages, sendMessages, disconnect,connected}}>
      {children}
    </SocketContext.Provider>
  );
}
export const useSocket = ()=>  useContext(SocketContext) 