import { useState, useEffect, useRef } from "react";
import { service } from "../services/api";
import { useUser } from "../contexts/UserContext.jsx";

export default function EmotionalReminderPhoto() {
    const [image, setImage] = useState(null);
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const { user, userId, setUser, setUserId } = useUser();

    useEffect(() => {
        startCamera();

        return () => {
            stopCamera();
        };
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
            }
        } catch (err) {
            console.error("Error accediendo a la cámara:", err);
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };

    const dataURLtoBlob = (dataurl) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };

    const handleCapture = () => {
        const video = videoRef.current;
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");
        setImage(dataUrl);
        stopCamera();
    };

    const handleRetake = () => {
        setImage(null);
        startCamera();
    };

    const handleSend = async () => {
        if (!image) return;
        const emocion = JSON.parse(localStorage.getItem("emotion"));

        const formData = new FormData();
        const blob = dataURLtoBlob(image);
        formData.append("file", blob, "photo.png");
        formData.append("userId", userId);
        formData.append("emotionalId", emocion.id);

        setImage(null);

        try {
            const response = await service.uploadEmotionalImage(formData);
        } catch (error) {
            console.error("Error al enviar la imagen:", error);
        }
    };

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline style={{ display: image ? "none" : "block" }}></video>
            <canvas id="canvas" style={{ display: "none" }}></canvas>
            {image && <img src={image} alt="Captured" />}
            <div>
                {!image ? (
                    <button onClick={handleCapture}>Tomar foto</button>
                ) : (
                    <>
                        <button onClick={handleRetake}>Volver a tomar foto</button>
                        <button onClick={handleSend}>Enviar foto</button>
                    </>
                )}
            </div>
        </div>
    );
}