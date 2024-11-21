import Home from "./pages/Home";
import Navbar from "./pages/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AskQuestion from "./pages/AskQuestion";
import Profile from "./pages/Profile";
import Room from "./pages/Room";
import Chat from "./pages/Chat";
import Payments from "./pages/Payments";
export default function App() {
  return (
    <Router>
      <>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/question" element={<AskQuestion />} />
          <Route path="/room" element={<Room />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/pricing" element={<Payments />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </>
    </Router>
  );
}
