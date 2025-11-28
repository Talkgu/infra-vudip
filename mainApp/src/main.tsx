import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthProvider";
import router from "./router/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./contexts/UserContext";
import { SocketProvider } from "./contexts/SocketContext";

function AppWithAuth() {
    const { loading } = useAuth();

    if (loading) return null

    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer position="bottom-right" autoClose={3000} closeOnClick draggable pauseOnHover closeButton={false} hideProgressBar/>
        </>
    );
}

createRoot(document.getElementById("root") as HTMLElement ).render(
    <StrictMode>
        <UserProvider>
            <SocketProvider>
                <AuthProvider>
                    <AppWithAuth />
                </AuthProvider>
            </SocketProvider>
        </UserProvider>
    </StrictMode>
);
