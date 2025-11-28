import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Room from "./pages/General/Room";
import Start from "./pages/General/Start";
import "./styles/General/App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/room/:roomId" element={<Room />} />
            </Routes>
        </Router>
    );
}

export default App;
