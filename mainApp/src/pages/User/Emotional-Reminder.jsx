import EmotionalReminderPhoto from "../../components/UploadEmotionalPhoto.jsx";
import DefaultLayout from "../../layout/Default-Layout.jsx";
import SelectorEmocional from "../../layout/Select-Emotion.jsx";
import "../../styles/User/Emotional-Reminder.css";

export default function EmotionalReminder() {
    return (
        <DefaultLayout>
            <div className="content">
                <div className="general-card">
                    <h1>Recordatorio emocional</h1>
                    <p>¿Cómo te sientes hoy? Sube una foto para recordar este día.</p>
                    <EmotionalReminderPhoto />
                </div>
            </div>
        <SelectorEmocional/>
        </DefaultLayout>
    );
}