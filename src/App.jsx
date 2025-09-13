import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import PracticeForm from "./Pages/PracticeForm";
import Calculator from "./Pages/Calculator";
import Tabel from "./Pages/Tabel";

function App() {
  return (
    <Router>
      <Routes>
        {/* 👇 Default route goes to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/practice" element={<PracticeForm />} />
        <Route path="/calculator" element={<Calculator />} />
         <Route path="/Tabel" element={<Tabel />} />

        {/* Optional: Catch-all to redirect unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
