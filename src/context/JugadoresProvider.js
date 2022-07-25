import { useState, createContext, useEffect } from "react";
import axios from "axios";

const JugadoresContext = createContext();

const JugadoresProvider = ({ children }) => {
  const [partidaIniciada, setPartidaIniciada] = useState(false);
  const [partida, setPartida] = useState({});
  const [jugadorUno, setJugadorUno] = useState("");
  const [jugadorDos, setJugadorDos] = useState("");
  const [cartasJugadorUno, setCartasJugadorUno] = useState([]);
  const [cartasJugadorDos, setCartasJugadorDos] = useState([]);

  const handleJugadorUnoChange = (e) => {
    setJugadorUno(e.target.value);
  };
  const handleJugadorDosChange = (e) => {
    setJugadorDos(e.target.value);
  };

  useEffect(() => {
    const consultarAPI = async () => {
      if (partidaIniciada) {
        const url = `http://deckofcardsapi.com/api/deck/new/`;
        const { data } = await axios(url);
        setPartida(data);
      }
    };
    
    consultarAPI();
  }, [partidaIniciada]);


  
  return (
    <JugadoresContext.Provider value={{
      jugadorUno, setJugadorUno, jugadorDos, setJugadorDos,
      handleJugadorUnoChange, handleJugadorDosChange,
      partida, setPartida,
      partidaIniciada, setPartidaIniciada,
      cartasJugadorUno, setCartasJugadorUno,
      cartasJugadorDos, setCartasJugadorDos
    }}>
      {children}
    </JugadoresContext.Provider>
  );
};

export { JugadoresProvider };
export default JugadoresContext;