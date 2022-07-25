import React from "react";



const ListaCartas = ({ carta }) => {
    console.log(carta);
    return (
        <div className="card" >
            <img src={carta.image} className="card-img-top" alt="..." />
        </div>

    );

};

export default ListaCartas;