import { useEffect, useState } from "react";
import { service } from "../services/api";
import { useUser } from "../contexts/UserContext.jsx";
import "../styles/User/Fetch-Dashboard.css";

export default function FetchDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { userId } = useUser();

  useEffect(() => {
    if (userId) {
      service.getDashboard(userId)
        .then((res) => {
          setDashboard(res.data?.emotions);
        })
        .catch((err) => console.error("Error fetching dashboard:", err));
    }
  }, [userId]);

  if (!dashboard) return null;

  return (
    <>
      <button className="boton-dashboard" onClick={() => setShowModal(true)}>
        Ver estadísticas emocionales
      </button>

      {showModal && (
        <div className="modal-dashboard">
          <div className="contenido-modal">
            <button className="cerrar-modal" onClick={() => setShowModal(false)}>
              ✖
            </button>

            <h2>Estado emocional de {dashboard.userName}</h2>

            <div className="bloque-seccion">
              <h3>🧠 Emociones registradas</h3>
              {dashboard.userEmotionalState && dashboard.userEmotionalState.length > 0 ? (
                <ul>
                  {dashboard.userEmotionalState.map((emo, idx) => (
                    <li key={idx}>
                      <span className="nombre-emocion">{emo.name}</span>
                      <span className="fecha-emocion">{emo.date}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay emociones registradas aún.</p>
              )}
            </div>

            <div className="bloque-seccion">
              <h3>📘 Ejercicios realizados</h3>
              {dashboard.userWorkout && dashboard.userWorkout.length > 0 ? (
                <ul>
                  {dashboard.userWorkout.map((work, idx) => (
                    <li key={idx}>
                      <strong>{work.name}</strong> <br />
                      Inicio: {new Date(work.createdAt).toLocaleString()} <br />
                      Estado: {work.endedAt ? new Date(work.endedAt).toLocaleString() : "En curso"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay ejercicios aún.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}