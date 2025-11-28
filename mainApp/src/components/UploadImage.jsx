import { useState, useEffect } from "react";
import "../styles/User/Diary.css";

export default function ImageUploader({ setImage, image }) {
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (!image) setPreviewImage(null);
  }, [image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  return (
    <div className="image-uploader">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id="imageInput"
        hidden
      />
      {!previewImage && (
        <label htmlFor="imageInput" className="diary-save-button">
          Elegir imagen
        </label>
      )}
      {previewImage && (
        <div className="preview-container">
          <img src={previewImage} alt="Preview" className="preview-image" />
          <div className="image-buttons">
            {/* <p className="preview-text">imagen subida</p> */}
            <button
              type="button"
              onClick={() => setImage(null)}
              className="diary-save-button"
              >
              Eliminar Imagen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
