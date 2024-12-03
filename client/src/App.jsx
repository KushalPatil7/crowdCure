import Home from "./pages/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AskQuestion from "./pages/AskQuestion";
import Profile from "./pages/Profile";
import Room from "./pages/Room";
import Chat from "./pages/Chat";
import Payments from "./pages/Payments";
import MainLayout from "./pages/MainLayout";
export default function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route  element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/question" element={<AskQuestion />} />
            <Route path="/room" element={<Room />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/pricing" element={<Payments />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </>
    </Router>
  );
}
