import { createContext, useContext, useState, useEffect, use } from "react";
import { getAuth, GoogleAuthProvider, signOut, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import router from "../router/router";
import { service } from "../services/api";
import "../services/firebaseConfig";
import { useUser } from "../contexts/UserContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const {setUser,setUserId} = useUser()
    const auth = getAuth();

    useEffect(() => {
    async function checkSession() {
        try {
        var session;
        if (localStorage.getItem("userType") === "consultant") {
            session = await service.getAuthConsultant();
        } else {
            session = await service.getAuthMe();
        }
        if (session && session.data) {
            setIsAuthenticated(true);
            setUser(session.data.username)
            setUserId(session.data.id)
        } else {
            setIsAuthenticated(false);
        }
        } catch {
        setIsAuthenticated(false);
        } finally {
        setIsLoading(false); // Indico que terminé de chequear
        }
    }
    checkSession();
    }, []);



    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result =  await signInWithPopup(auth, provider);
            const googleUser = auth.currentUser;

                if (localStorage.getItem("userType") === "consultant"){
                    try {
                        const consultor = await service.findConsultant(googleUser.email);
                            if (consultor.data) {
                                if (consultor.data.reported){
                                    router.navigate('/denied');
                                    }
                                else{
                                    localStorage.setItem("consultor", JSON.stringify(consultor.data));
                                    router.navigate('/verify-face');
                                }
                            }
                            else if (!consultor.data){
                                const usuario = {
                                    "username": googleUser.displayName,
                                    "mail": googleUser.email,
                                    "password": googleUser.uid,
                                };
                                localStorage.setItem("user",JSON.stringify(usuario));
                                router.navigate('/token');
                            }

                        } catch (err) {
                                setError("Error al iniciar sesión");
                        }
                }
                if (localStorage.getItem("userType") === "user"){
                    try {
                        const user = await service.findUser(googleUser.email);
                        if (user.data) {
                            if (user.data.reported){
                                router.navigate('/denied');
                            }
                            else{
                                setIsAuthenticated(true);
                                router.navigate('/home');
                            }
                        }
                        else if (!user.data){
                            const usuario = {
                                "username": googleUser.displayName,
                                "mail": googleUser.email,
                               "password": googleUser.uid,
                            };
                            localStorage.setItem("user",JSON.stringify(usuario));
                            router.navigate('/token');
                        }
                    } catch (err) {
                        setError("Error al iniciar sesión.");
                    }
                }
        } catch (error) {
            console.error("Error en autenticación con Google:", error);
        }
    };

    const loginWithFacebook = async () => {
        const provider = new FacebookAuthProvider();
        try {
            signInWithPopup(auth, provider).then(async (result) => {
                const facebookUser = result.user;

                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;

                const userData = {
                    username: facebookUser.displayName,
                    mail: facebookUser.email,
                    password: facebookUser.uid,
                };

                if (localStorage.getItem("userType") === "consultant"){
                    try {
                        const consultor = await service.findConsultant(facebookUser.email);
                        if (consultor.data) {
                            if (consultor.data.reported) {
                                router.navigate('/denied');
                            }
                            else {
                                localStorage.setItem("consultor", JSON.stringify(consultor.data));
                                router.navigate('/verify-face');
                            }
                        }
                        else if (!consultor.data) {
                            localStorage.setItem("user",JSON.stringify(userData));
                            router.navigate('/token');
                        }
                    } catch (err) {
                                setError("Error al iniciar sesión");
                    }
                }
                if (localStorage.getItem("userType") === "user"){
                    try {
                        const user = await service.findUser(facebookUser.email);
                        if (user.data) {
                            if (user.data.reported){
                                router.navigate('/denied');
                            }
                            else{
                                setIsAuthenticated(true);
                                router.navigate('/home');
                            }
                        }
                        else if (!user.data){
                            localStorage.setItem("user",JSON.stringify(userData));
                            router.navigate('/token');
                        }
                    } catch (err) {
                        setError("Error al iniciar sesión.");
                    }
                }
            });
        } catch (error) {
            console.error("Error en autenticación con Facebook:", error);
        }
    }


    // 🔹 Logout (cerrar sesión)
    const logout = async () => {
        try {
            await signOut(auth);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, setIsAuthenticated, loginWithGoogle, logout, loginWithFacebook }}>
            {isLoading ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <p>Cargando...</p>
                </div>) : (children)}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
