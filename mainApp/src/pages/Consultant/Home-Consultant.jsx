import DefaultLayout from "../../layout/Default-Layout.jsx";
import "../../styles/General/Home.css"

export default function HomeConsultant(){
    return (
        <DefaultLayout>
            <div className="home-css">
                <h1>Bienvenido a Vudip</h1>
                <p className="texto-home">Bienvenido a este viaje de aprendizaje emocional?¿</p>
            </div>

        </DefaultLayout>
    );
}