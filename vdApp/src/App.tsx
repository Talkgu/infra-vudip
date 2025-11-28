import { BrowserRouter, Routes, Route, useParams, Navigate } from "react-router-dom";
import VideoCall from "./videocall/Videocall";

function VideoCallRoute() {
    const { room } = useParams();

    if (!room) return <Navigate to="/" replace />; // fallback

    return <VideoCall RoomId={room}/>;
}

export default function App() {
    return (
        <BrowserRouter basename="/videocall">
        <Routes>
            <Route path="/:room" element={<VideoCallRoute />} />
            {/* optional root redirect or fallback
            <Route path="/" element={<Navigate to="/room/default-room" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
        </BrowserRouter>
    );
}