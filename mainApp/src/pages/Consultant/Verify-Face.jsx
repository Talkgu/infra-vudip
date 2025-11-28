import VerifyFace from "../../components/VerifyFace";
import "../../styles/Consultant/Verify-Face-Page.css";

export default function VerifyFacePage() {
    return (
        <div className="verify-container">
            <div className="verify-box">
                <h2 className="h2">Verificación de rostro</h2>
                <p className="p">Por favor, asegúrese de que su rostro esté bien iluminado y visible.</p>
                <div className="verify-face">
                    <div className="verify-cam" />
                        <VerifyFace/>
                    </div>
            </div>
        </div>
    );
}