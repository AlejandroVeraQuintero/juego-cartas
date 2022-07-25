import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {JugadoresProvider } from "./context/JugadoresProvider";
import RegistroJugadoresForm from "./pages/RegistroJugadores";
import Juego from "./pages/Juego";
import './App.css';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JugadoresProvider>
          <RegistroJugadoresForm/>
          </JugadoresProvider>} />
        <Route path="/juego" element={<JugadoresProvider>
          <Juego/>
        </JugadoresProvider>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
