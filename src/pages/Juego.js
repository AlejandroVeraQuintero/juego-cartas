import React from "react";
import '../App.css';
import useJugadores from "../hooks/useJugadores";
import CartasGanadoras from "../components/CartasGanadoras";
import ListaCartas from "../components/ListaCartas";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const Juego = () => {

    let navigate = useNavigate();

    const { jugadorUno, jugadorDos,
        cartasJugadorUno,
        cartasJugadorDos,
        partida,
        partidaIniciada,
        ganadorJugadorUno,
        ganadorJugadorDos,
        setPartidaIniciada,
        setCartasJugadorUno,
        setCartasJugadorDos } = useJugadores();



    const consultarCartasAPI = async () => {
        if (partida.deck_id !== undefined && partidaIniciada) {
            const url = `http://deckofcardsapi.com/api/deck/${partida.deck_id}/draw/?count=2 `;
            const { data } = await axios(url);
            setCartasJugadorDos([...cartasJugadorDos, data.cards[Math.floor(Math.random() * 2)]]);
            setCartasJugadorUno([...cartasJugadorUno, data.cards[Math.floor(Math.random() * 2)]]);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes tener jugadores registrados',
            });
            setPartidaIniciada(false);
            routeChange();
        }
    };


    const reiniciar = () => {
        setPartidaIniciada(true);
        setCartasJugadorDos([]);
        setCartasJugadorUno([]);
    }

    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    return (
        <div className="general">
            <div>
                <button type="button" className="btn btn-danger button reiniciar" onClick={reiniciar}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bootstrap-reboot" viewBox="0 0 16 16">
                        <path d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.812 6.812 0 0 0 1.16 8z" />
                        <path d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324h-1.6z" />
                    </svg>
                    &nbsp;
                    Reiniciar
                </button>
            </div>
            <div>

                <button type="button" className="btn btn-warning button pedir" onClick={consultarCartasAPI}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-plus" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z" />
                    </svg>
                    &nbsp;
                    Pedir
                </button>
            </div>
            <div className="jugadorUno">
                <h1>Jugador 1: {jugadorUno}</h1>
                <div className="carta-ganadora">
                    {ganadorJugadorUno.map((cartas) => (
                        <CartasGanadoras
                            key={cartas.code === undefined ? "" : cartas.code}
                            carta={cartas}
                        />
                    ))}

                </div>
                <div className="lista-cartas">
                    {
                        cartasJugadorUno.map((cartas) => (
                            <ListaCartas
                                key={cartas.code === undefined ? "" : cartas.code}
                                carta={cartas}
                            />
                        ))
                    }
                </div>

            </div>
            <div className="jugadorDos">
                <h1> Jugador 2: {jugadorDos}</h1>
                <div className="carta-ganadora">
                    {ganadorJugadorDos.map((cartas) => (
                        <CartasGanadoras
                            key={cartas.code === undefined ? "" : cartas.code}
                            carta={cartas}
                        />
                    ))}
                </div>
                <div className="lista-cartas">
                    {
                        cartasJugadorDos.map((cartas) => (
                            <ListaCartas
                                key={cartas.code === undefined ? "" : cartas.code}
                                carta={cartas}
                            />
                        ))
                    }
                </div>

            </div>
        </div>
    );

};

export default Juego;