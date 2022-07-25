import { useState, createContext } from "react";


const JugadoresContext = createContext();

const JugadoresProvider = ({ children }) => {
  const [jugadorUno, setJugadorUno] = useState();
  const [jugadorDos, setJugadorDos] = useState("");
  return (
    <JugadoresContext.Provider value={{ jugadorUno, setJugadorUno ,jugadorDos, setJugadorDos}}>
      {children}
    </JugadoresContext.Provider>
  );
};

export {JugadoresProvider};
export default JugadoresContext;