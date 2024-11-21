import React from "react";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<></>} />
      </Routes>
      </Router>
    </>
  );
}

export default App;
