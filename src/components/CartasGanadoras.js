import React from "react";



const CartasGanadoras = ({ carta }) => {


    return (
            <div className="card" >
                <img src={carta.image  === undefined? '':carta.image } className="card-img-top" alt="..." />
            </div>
    );

};

export default CartasGanadoras;