import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app).useDeviceLanguage();
const Gprovider = new GoogleAuthProvider();
const Fprovider = new FacebookAuthProvider();

// Función para iniciar sesión con Google
const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, Gprovider);
        return result.user;
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
    }
};

const signInWithFacebook = async () => {
    try {
        const result = await signInWithPopup(auth, Fprovider);
        return result.user;
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
    }  
}

// Función para cerrar sesión
const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
};

export { auth, signInWithGoogle, signInWithFacebook, logout };
