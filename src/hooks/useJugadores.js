import { useContext } from "react";
import JugadoresContext from "../context/JugadoresProvider";

const useJugadores = () => {
  return useContext(JugadoresContext);
};

export default useJugadores;
