import DefaultLayout from "../../layout/Default-Layout.jsx";
import "../../styles/General/Denied.css"

export default function Home(){
    return (
        <DefaultLayout>
            <div className="denied-container">
                <h1>Acceso denegado.</h1>
                <p>Usted cuenta con reportes que no le permiten ingresar.</p>
            </div>
        </DefaultLayout>
    );
}