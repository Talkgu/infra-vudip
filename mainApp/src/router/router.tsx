import { createBrowserRouter, RouteObject } from "react-router-dom";
import Nosotros from "../pages/General/Nosotros.jsx";
import Logout from "../pages/General/Logout.jsx"
import Denied from "../pages/General/Denied.jsx";
import Donation from "../pages/General/Donation.jsx";
import Start from "../pages/General/Start.jsx";
import Token from "../pages/General/Token.jsx";
import UnprotectedRoute from "../pages/General/Unprotected-Route.jsx";
import ProtectedRoute from "../pages/General/Protected-Route.jsx";
import Home from "../pages/User/Home.js";
import Login from "../pages/User/Login.jsx";
import Signup from "../pages/User/Signup.jsx";
import Diary from "../pages/User/Diary.jsx";
import EjercicesEmotion from "../pages/User/Ejercice-Emotion.jsx";
import EmotionalReminder from "../pages/User/Emotional-Reminder.jsx"
import Dashboard from "../pages/User/Dashboard.jsx";
import HomeConsultant from "../pages/Consultant/Home-Consultant.jsx";
import LoginConsultant from "../pages/Consultant/Login-Consultant.jsx";
import SignupConsultant from "../pages/Consultant/Signup-Consultant.jsx";
import VerifyFacePage from "../pages/Consultant/Verify-Face.jsx";
import Webcam from "../pages/Consultant/Webcam.jsx";
import WaitingRoomPage from "../pages/User/WaitingRoom.jsx";
import Room from "../pages/General/Room.jsx";

const routes:RouteObject[] = [
    {
    path: "/",
    element: <UnprotectedRoute />,
    children: [
        {path: "/", element: <Start />},
        {path: "/token", element: <Token />},
        {path: "/login", element: <Login />,},
        {path: "/signup", element: <Signup />,},
        {path: "/login-consultant", element: <LoginConsultant />,},
        {path: "/signup-consultant", element: <SignupConsultant />,},
        {path: "/webcam", element: <Webcam />,},
        {path: "/verify-face", element: <VerifyFacePage />,},
        {path: "/denied", element: <Denied />,},
        {path: "/nosotros", element: <Nosotros />,},
        ]
    },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/room/:roomId", element: <Room /> },
      { path: "/diary", element: <Diary /> },
      { path: "/home-consultant", element: <HomeConsultant /> },
      { path: "/donation", element: <Donation /> },
      { path: "/logout", element: <Logout /> },
      { path: "/EjerciceScreen", element: <EjercicesEmotion /> },
      { path: "/emotionalReminder", element: <EmotionalReminder /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/WaitingRoom", element: <WaitingRoomPage /> },
    ],
  },
]

const router = createBrowserRouter(routes)
export default router;
