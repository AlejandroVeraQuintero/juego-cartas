import React from "react";
import { useNavigate } from "react-router-dom";
import useJugadores from "../hooks/useJugadores";
import Swal from 'sweetalert2';



const Form = () => {

    const { jugadorUno, setJugadorUno, jugadorDos, setJugadorDos} = useJugadores();

    let navigate = useNavigate();

    const handleJugadorUnoChange = ({ target }) => {
        setJugadorUno(target.value);
    };
    const handleJugadorDosChange = ({ target }) => {
        setJugadorDos(target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (jugadorUno !== "" && jugadorDos !== "") {
            routeChange();
            console.log(jugadorUno);
            console.log(jugadorDos);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes escribir el nombre de los 2 jugadores antes de empezar',
            });
        }

    };

    const routeChange = () => {
        let path = `juego`;
        navigate(path);
    }

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <div className="input-group mb-3">
                <span className="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-1-circle-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312Z" />
                    </svg>
                </span>
                <input type="text" className="form-control input" value={jugadorUno} onChange={handleJugadorUnoChange} placeholder="Jugador 1" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-2-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM6.646 6.24c0-.691.493-1.306 1.336-1.306.756 0 1.313.492 1.313 1.236 0 .697-.469 1.23-.902 1.705l-2.971 3.293V12h5.344v-1.107H7.268v-.077l1.974-2.22.096-.107c.688-.763 1.287-1.428 1.287-2.43 0-1.266-1.031-2.215-2.613-2.215-1.758 0-2.637 1.19-2.637 2.402v.065h1.271v-.07Z" />
                    </svg>
                </span>
                <input type="text" className="form-control input" value={jugadorDos} onChange={handleJugadorDosChange} placeholder="Jugador 2" />
            </div>

            <div className="input-group mb-3">
                <button type="submit" className="btn btn-success button">Empezar</button>
            </div>
        </form>
    );

};

export default Form;