import LogoutButton from "../../components/LogoutButton.jsx";
import DefaultLayout from "../../layout/Default-Layout.jsx";
import "../../styles/User/Signup-Login.css"
import "../../styles/General/General.css"
import "../../styles/General/Donations.css"

export default function Home(){
    return (
        <DefaultLayout>
            <div className="content">
                <div className="general-card">
                    <h1>¿Desea cerrar sesión?</h1>
                    <p>clickee aquí si es el caso</p>
                    <LogoutButton className="custom-botton-donation"/>
                </div>
            </div>
        </DefaultLayout>
    );
}