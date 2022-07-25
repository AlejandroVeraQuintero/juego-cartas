import React from "react";
import '../App.css';
import useJugadores from "../hooks/useJugadores";
import  CartasGanadoras from "../components/CartasGanadoras";
import  ListaCartas from "../components/ListaCartas";


const Juego = () => {

 const { jugadorUno, jugadorDos} = useJugadores();

    return (
        <div className="general">
            <div className="jugadorUno">
                <h1>Jugador 1: {jugadorUno}</h1>
                <CartasGanadoras/>
                <ListaCartas/>
            </div>
            <div className="jugadorDos">
                <h1> Jugador 2: {jugadorDos}</h1>
                <CartasGanadoras/>
                <ListaCartas/>
            </div>
        </div>
    );

};

export default Juego;