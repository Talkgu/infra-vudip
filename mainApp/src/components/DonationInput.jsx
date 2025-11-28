import { useState } from "react";
import { service } from "../services/api";

export default function DonationInput() {
    const [unitPrice, setUnitPrice] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (unitPrice < 1000) {
            setError("El monto mínimo de donación es de 1000");
            return;
        }
        setError("");

        service.registerDonation(unitPrice)
            .then((response) => {
                const donationLink = response.data.res.init_point;
                window.open(donationLink);
            })
            .catch((error) => {
                console.error("Error al registrar la donación:", error);
            });
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setUnitPrice(value);

        if (value < 1000) {
            setError("El monto mínimo de donación es de 1000");
        } else {
            setError("");
        }
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="donation" className="block text-lg font-medium mb-2">
                    Monto de la donación
                </label>
                <input
                    type="number"
                    name="unitPrice"
                    value={unitPrice}
                    onChange={handleChange}
                    required
                    className="custom-input-donation"
                />
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <button
                    type="submit"
                    className="custom-botton-donation"
                >
                    Donar
                </button>
            </form>
        </div>
    );
}
