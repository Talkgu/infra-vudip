import FetchDashboard from "../../components/FetchDashboard";
import DefaultLayout from "../../layout/Default-Layout";
import SelectorEmocional from "../../layout/Select-Emotion";
import "../../styles/General/General.css"

export default function Dashboard() {

    return (
        <DefaultLayout>
            <div className="general-content">           
                <div className="general-card">
                    <h1>Dashboard</h1>
                    <p> Aquí puedes ver tu progreso y estadísticas. </p>
                    <FetchDashboard />
                </div>
            </div>

        </DefaultLayout>
    );
}