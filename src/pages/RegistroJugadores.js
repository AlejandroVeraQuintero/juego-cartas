import React from "react";
import poker from "../img/poker-completo.png";
import Form from "../components/Form";

const RegistroJugadores = () => {

    return (
        <div className="body">
            <div className="form-group">
                <img src={poker} alt="Logo" width="50%" />
                <h1>Jugadores</h1>
                <div className="body">
                    <Form/>
                </div>
            </div>
        </div>
    );

};

export default RegistroJugadores;
