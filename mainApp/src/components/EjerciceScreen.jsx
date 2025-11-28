import { useEffect, useState } from "react";
import { service } from "../services/api";
import "../styles/User/Pagina-Ejercicios.css";
import SelectorEmocional from "../layout/Select-Emotion";

export default function PaginaEjercicios() {
  const [emotion, setEmotion] = useState(null);
  const [ejercicios, setEjercicios] = useState([]);
  const [modalEjercicio, setModalEjercicio] = useState(null);

  useEffect(() => {
  try {
    const storedEmotion = JSON.parse(localStorage.getItem("emotion"));
    if (storedEmotion?.name) {
      setEmotion(storedEmotion.name);
      service.getEmotionalExercises(storedEmotion.name)
        .then((res) => setEjercicios(res.data))
        .catch((err) => console.error("Error cargando ejercicios:", err));
    } else {
      alert("No se ha seleccionado ninguna emoción válida");
    }
  } catch (e) {
    console.error("Error leyendo emoción del localStorage:", e);
    alert("Datos inválidos en almacenamiento local");
  }
}, []);

  return (
    <div className="pagina-ejercicios">
      <h2 className="titulo-emocion">Ejercicios para: {emotion}</h2>
      <div className="tarjetas-contenedor">
        {ejercicios.map((ej, idx) => (
          <div
            key={idx}
            className="tarjeta-ejercicio"
            onClick={() => setModalEjercicio(ej)}
          >
            <div className="icono-ejercicio">🌞</div>
            <h3 className="nombre-ejercicio">{ej.name}</h3>
            <p className="desc-ejercicio">{ej.description.substring(0, 60)}...</p>
          </div>
        ))}
      </div>

      {modalEjercicio && (
        <div className="modal-ejercicio">
          <div className="modal-contenido">
            <button
              className="cerrar-modal"
              onClick={() => setModalEjercicio(null)}
            >
              ✖
            </button>
            <div className="icono-ejercicio-grande">🌞</div>
            <h3>{modalEjercicio.name}</h3>
            <p>{modalEjercicio.description}</p>
          </div>
        </div>
      )}
      
    </div>
  );
}