import { SERVER_URL } from "./config"
import axios from "axios"

interface UserInfo {
    id: string, username: string 
}

export const api = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true
})

export async function getUserSession() {
    return await api.get("/users/authme")
}

export async function getUserId() {
    try {
        const info = await getUserSession()
        return info.data.id;
    } catch {
        console.error("User is not authorized. Do something")
        // window.location.href = UNAUTHORIZED_URL // Readirect instead of cleaning up
    }
}

export async function getDeviceWithKind(kind: MediaDeviceKind) {
    const devs = await navigator.mediaDevices.enumerateDevices()
    const filtered = devs.filter(
        dev => dev.kind == kind
    )

    return filtered
}

export function getAudioLabel(isActive: boolean) {
     return isActive ? "/assets/microphone-on.svg" 
                     : "/assets/microphone-off.svg"
}

export function getVideoLabel(isActive: boolean) {
    return isActive ? "/assets/video-on.svg" 
                    : "/assets/video-off.svg"
}