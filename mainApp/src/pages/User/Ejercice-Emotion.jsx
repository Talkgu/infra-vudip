import DefaultLayout from "../../layout/Default-Layout.jsx";
import EjerciceScreen from "../../components/EjerciceScreen.jsx";
import SelectorEmocional from "../../layout/Select-Emotion.jsx";

export default function EjercicesEmotion() {
    return (
        <DefaultLayout>
            <div style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                <h1>Ejercicios emocionales</h1>
            <div style={{ width: "100%", maxWidth: "600px", padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <EjerciceScreen />
        </div></div>
        <SelectorEmocional/>
        </DefaultLayout>
    );
}