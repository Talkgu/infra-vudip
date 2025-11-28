import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useNavigate } from "react-router-dom";
import { service } from "../services/api";
import { useAuth } from "../auth/AuthProvider";

export default function VerifyFace() {
    const videoRef = useRef(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const [error, setError] = useState(null);

    const consultor = JSON.parse(localStorage.getItem("consultor"));

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = "/models";
            await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
            await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
            await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        };

        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setLoading(false);
            } catch (err) {
                console.error("Error accessing webcam:", err);
                setError("No se pudo acceder a la cámara");
            }
        };

        const init = async () => {
            await loadModels();
            await startWebcam();
        };

        init();

        // Cleanup: apagar la cámara al salir
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const verifyFace = async () => {
        try {
            const video = videoRef.current;

            const detectionLive = await faceapi
                .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (!detectionLive) {
                setError("No se detectó una cara");
                return;
            }

            const response = await service.getConsultantImage(consultor.userId);
            const blob = await response.data;
            const image = await faceapi.bufferToImage(blob);

            const detectionStored = await faceapi
                .detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (!detectionStored) {
                setError("No se detectó una cara en la imagen guardada");
                return;
            }

            const distance = faceapi.euclideanDistance(
                detectionLive.descriptor,
                detectionStored.descriptor
            );


            if (distance < 0.5) {
                auth.setIsAuthenticated(true);
                navigate("/home-consultant");
            } else {
                setError("Falló la verificación de la cara, intente de nuevo.");
            }

        } catch (err) {
            setError("Error verificando la cara: " + err.message);
        }
    };

    return (
        <div >
            <h2>Verificación facial</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading ? (
                <p>Cargando modelos y cámara...</p>
            ) : (
                <>
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        width="600"
                        height="500"
                    />
                    <br />
                    <button onClick={verifyFace}>Verificar rostro</button>
                </>
            )}
        </div>
    );
}