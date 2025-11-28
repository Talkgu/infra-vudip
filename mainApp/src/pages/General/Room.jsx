import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { toasty } from "../../utils/toast.jsx";
import { useSocket } from "../../contexts/SocketContext";
import "../../styles/General/Room.css";

export default function Room() {
  const [mensaje, setMensaje] = useState("");
  const [noEnviarMensaje, setNoEnviarMensaje] = useState(false);
  const [vacio, setVacio] = useState(false);
  const timerRef = useRef(null);
  const { roomId } = useParams();
  const { conectar, messages, sendMessages, disconnect } = useSocket();

  useEffect(() => {
    conectar(roomId);
    return () => {
      disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSendMessage = (message) => {
    if (noEnviarMensaje) {
      toasty.emoji("💤", "esperá un toque antes de volver a mandar", { autoClose: 500 });
      return;
    }
    if (!message.trim()) {
      toasty.emoji("🚫", "no puedes mandar mensajes vacíos", { autoClose: 250 });
      setVacio(true);
      setMensaje("");
      return;
    }

    setNoEnviarMensaje(true);
    timerRef.current = setTimeout(() => {
      setNoEnviarMensaje(false);
    }, 1000);

    sendMessages(message);
    toasty.emoji("✅", "Mensaje enviado", { autoClose: 300 });
    setMensaje("");
    setVacio(false);
  };

  return (
    <div className="chat-room">
      <div className="chat-container">
        <ul className="chat-messages">
          {messages.map((msg, index) => (
            <li
              key={index}
              className={`message-bubble ${
                msg.senderId === "yo" ? "sent" : "received"
              }`}
            >
              <div className="message-content">
                {msg.content}
              </div>
            </li>
          ))}
        </ul>

        <form
          className="chat-input-container"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(mensaje);
          }}
        >
          <input
            type="text"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Hola! Qué tal estás..."
            className="chat-input"
          />
          <button type="submit" className="chat-send-button">
            ▶
          </button>
        </form>
      </div>
    </div>
  );
}
