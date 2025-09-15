import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import PracticeForm from "./Pages/PracticeForm.jsx";
import Calculator from "./Pages/Calculator.jsx";
import Tabel from "./Pages/Tabel.jsx";
import Tabel2 from "./Pages/Tabel2.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/practice" element={<PracticeForm />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/tabel" element={<Tabel />} />
        <Route path="/tabel2" element={<Tabel2 />} />

        {/* Catch-all route redirects unknown paths */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
