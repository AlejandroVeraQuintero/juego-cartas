import { useState, createContext } from "react";


const JugadorDosContext = createContext();

const JugadorDosProvider = ({ children }) => {
  const [jugadorDos, setJugadorDos] = useState("");
  return (
    <JugadorDosContext.Provider value={{ jugadorDos, setJugadorDos }}>
      {children}
    </JugadorDosContext.Provider>
  );
};

export default JugadorDosProvider;