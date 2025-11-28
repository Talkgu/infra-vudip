export const SERVER_URL = "http://localhost:8000";
export const SIGNALING_SERVER_URL = SERVER_URL + "/webrtc";
export const LEAVE_URL = "https://youtu.be/dQw4w9WgXcQ?si=hGYQHtikruVbsmJ8" // Url used when leaving the page
export const UNAUTHORIZED_URL = "https://youtu.be/dQw4w9WgXcQ?si=hGYQHtikruVbsmJ8" // Url used when leaving the page

export const RTC_CONFIG = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:23.21.150.121:3478' },
        { urls: 'stun:iphone-stun.strato-iphone.de:3478' }
    ]
};