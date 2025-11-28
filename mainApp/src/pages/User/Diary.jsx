import { useState } from "react";
import DiaryInput from "../../components/DiaryInput.jsx";
import UploadImage from "../../components/UploadImage.jsx";
import DefaultLayout from "../../layout/Default-Layout.jsx";
import { service } from "../../services/api.js";
import { useUser } from "../../contexts/UserContext.jsx";
import SelectorEmocional from "../../layout/Select-Emotion.jsx";
import "../../styles/User/Diary.css";
import "../../styles/General/General.css";

export default function Diary() {
  const [entry, setEntry] = useState("");
  const { user, userId } = useUser();
  const [image, setImage] = useState(null);

  const handleSend = () => {
    if (entry.trim() === "" && !image) return;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("userId", userId);
    formData.append("content", entry);

    service.uploadDiary(formData).then((response) => {
      console.log(response);
    });
    setEntry("");
    setImage(null);
  };

  return (
    <DefaultLayout>
      <div className="diary-container">
        <h1 className="diary-title">Diario Emocional</h1>
        <p className="diary-subtitle">¿Qué tal estuviste hoy? Escribilo acá.</p>

        <div className="diary-body">
          {/* Panel Izquierdo: Imagen */}
          <div className="diary-left">
            <UploadImage setImage={setImage} image={image} />
          </div>

          {/* Panel Derecho: Texto */}
          <div className="diary-right">
            <DiaryInput setEntry={setEntry} entryText={entry} />
          </div>
        </div>

        {/* Botón Guardar */}
        <div className="diary-actions">
          <button className="diary-save-button" onClick={handleSend}>
            Guardar
          </button>
        </div>
      </div>

      <SelectorEmocional />
    </DefaultLayout>
  );
}