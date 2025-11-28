import { useState } from "react";
import { service } from "../services/api.js";
import { useUser } from "../contexts/UserContext.jsx";
import "../styles/User/Selector-Emocional.css";

const emociones = [
  { id: 1, name: "Alegre" },
  { id: 2, name: "Triste" },
  { id: 3, name: "Enojado" },
  { id: 4, name: "Miedo" },
  { id: 5, name: "Sorprendido" },
  { id: 8, name: "Confuso" },

];
export default function SelectorEmocional({ onSelect }) {
  const [desplegado, setDesplegado] = useState(false);
  const [seleccionada, setSeleccionada] = useState(null);
  const { user, userId, setUser, setUserId } = useUser(); // Get user data from context
  

const handleSelectEmotion = (emocion) => {
  setSeleccionada(emocion);
  setDesplegado(false);
  
  // Use userId from context instead of localStorage
  if (userId) {
    localStorage.setItem("emotion", JSON.stringify({ id: emocion.id, name: emocion.name }));
    service.changeEmotion(parseInt(userId), emocion.name);
  } else {
    console.error("No userId available in context");
  }
};

  return (
    <div className="contenedor-flex">
      <button className="boton" onClick={() => setDesplegado(!desplegado)}>
        {desplegado ? "ocultar seleccion" : (seleccionada ? seleccionada.name : "Seleccionar emoción")}
      </button>
      {desplegado && (
        <ul className="ul-emociones">
          {emociones.map((emocion, index) => (
            <li key={index}>
              <button
                onClick={() => handleSelectEmotion(emocion)}
                className="boton-emocion"
              >
                {emocion.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
