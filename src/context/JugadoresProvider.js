import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const JugadoresContext = createContext();


const JugadoresProvider = ({ children }) => {

  const [partidaIniciada, setPartidaIniciada] = useState(false);
  const [partida, setPartida] = useState({});
  const [jugadorUno, setJugadorUno] = useState("");
  const [jugadorDos, setJugadorDos] = useState("");
  const [cartasJugadorUno, setCartasJugadorUno] = useState([]);
  const [cartasJugadorDos, setCartasJugadorDos] = useState([]);
  const [ganadorJugadorUno, setGanadorJugadorUno] = useState([]);
  const [ganadorJugadorDos, setGanadorJugadorDos] = useState([]);

  const navigate = useNavigate();

  const handleJugadorUnoChange = (e) => {
    setJugadorUno(e.target.value);
  };
  const handleJugadorDosChange = (e) => {
    setJugadorDos(e.target.value);
  };




  useEffect(() => {
    const consultarAPI = async () => {
      if (partidaIniciada) {
        const url = `https://deckofcardsapi.com/api/deck/new/`;
        const { data } = await axios(url);
        setPartida(data);
      }
    };

    consultarAPI();
  }, [partidaIniciada]);


  useEffect(() => {
    let puntajeJugadorUno = 0;
    let puntajeJugadorDos = 0;
    const busquedaJugadorUno = cartasJugadorUno.reduce((acc, carta) => {
      acc[carta.value] = ++acc[carta.value] || 0;
      return acc;
    }, {});

    const busquedaJugadorDos = cartasJugadorDos.reduce((acc, carta) => {
      acc[carta.value] = ++acc[carta.value] || 0;
      return acc;
    }, {});
    const duplicadosJugadorUno = cartasJugadorUno.filter((carta) => { return busquedaJugadorUno[carta.value]; });
    const duplicadosJugadorDos = cartasJugadorDos.filter((carta) => { return busquedaJugadorDos[carta.value]; });

    const mensajeGanador = (jugador) => {
      Swal.fire({
        icon: 'success',
        title: `Se encontro un ganador ${jugador} `,
        confirmButtonText: 'Nueva partida',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/`);
          setPartidaIniciada(false);
          setCartasJugadorUno([]);
          setCartasJugadorDos([]);
          setGanadorJugadorUno([]);
          setGanadorJugadorDos([]);
        } 
      });
    }

    const puntajePinta = (letra) => {
      switch (letra) {
        case 'H':
          return 4;
        case 'S':
          return 3;
        case 'D':
          return 2;
        case 'C':
          return 1;
        default:
          return 0;
      }
    }

    const mensajeGanadorPuntaje = (jugador, puntaje) => {
      Swal.fire({
        icon: 'success',
        title: `Se encontro un ganador ${jugador} `,
        text: `En el desempate el  ${jugador} saco mejor puntaje : ${puntaje} por pinta`,
        confirmButtonText: 'Nueva partida',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/`);
          setPartidaIniciada(false);
          setCartasJugadorUno([]);
          setCartasJugadorDos([]);
          setGanadorJugadorUno([]);
          setGanadorJugadorDos([]);
        }
      });
    }

    const mensajeEmpateTotal = () => {
      Swal.fire({
        icon: 'info',
        title: `No se puedo dar un ganado`,
        text: `Empate Total`,
        confirmButtonText: 'Nueva partida',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/`);
          setPartidaIniciada(false);
          setCartasJugadorUno([]);
          setCartasJugadorDos([]);
          setGanadorJugadorUno([]);
          setGanadorJugadorDos([]);
        }
      });
    }


    if (duplicadosJugadorDos.length === 2 || duplicadosJugadorUno.length === 2) {
      if (duplicadosJugadorDos.length === 2 && duplicadosJugadorUno.length === 2) {
        duplicadosJugadorUno.map((carta) => (
          puntajeJugadorUno += puntajePinta(carta.code.slice(1))
        ))
        duplicadosJugadorDos.map((carta) => (
          puntajeJugadorDos += puntajePinta(carta.code.slice(1))
        ))
        if (puntajeJugadorUno > puntajeJugadorDos) {
          setGanadorJugadorUno(duplicadosJugadorUno);
          setGanadorJugadorDos(duplicadosJugadorDos);
          setTimeout(() => { mensajeGanadorPuntaje(jugadorUno, puntajeJugadorUno) }, 1000);
        } else if (puntajeJugadorDos > puntajeJugadorUno) {
          setGanadorJugadorUno(duplicadosJugadorUno);
          setGanadorJugadorDos(duplicadosJugadorDos);
          setTimeout(() => { mensajeGanadorPuntaje(jugadorUno, puntajeJugadorDos) }, 1000);
        } else if (puntajeJugadorUno === puntajeJugadorDos) {
          setGanadorJugadorUno(duplicadosJugadorUno);
          setGanadorJugadorDos(duplicadosJugadorDos);
          setTimeout(() => { mensajeEmpateTotal() }, 1000);
        }


      } else if (duplicadosJugadorUno.length === 2) {
        setGanadorJugadorUno(duplicadosJugadorUno);
        setTimeout(() => { mensajeGanador(jugadorUno) }, 1000);


      } else if (duplicadosJugadorDos.length === 2) {
        setGanadorJugadorDos(duplicadosJugadorDos);
        setTimeout(() => { mensajeGanador(jugadorDos) }, 1000);
      }
    }
  }, [cartasJugadorUno, cartasJugadorDos, jugadorUno, jugadorDos, navigate]);



  return (
    <JugadoresContext.Provider value={{
      jugadorUno, setJugadorUno, jugadorDos, setJugadorDos,
      handleJugadorUnoChange, handleJugadorDosChange,
      partida, setPartida,
      partidaIniciada, setPartidaIniciada,
      cartasJugadorUno, setCartasJugadorUno,
      cartasJugadorDos, setCartasJugadorDos,
      ganadorJugadorUno, setGanadorJugadorUno,
      ganadorJugadorDos, setGanadorJugadorDos
    }}>
      {children}
    </JugadoresContext.Provider>
  );
};

export { JugadoresProvider };
export default JugadoresContext;