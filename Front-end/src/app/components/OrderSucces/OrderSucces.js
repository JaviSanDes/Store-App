import React from 'react';
import classes from './OrderSucces.css';

const OrderSucces = (props) => {
    return (
        <div className={classes.Container} onLoad={()=> props.purchaseSuccess(false)}>
            <p>Order Succes!</p>
                <img
                  src={require("../../static/imagenes-productos/tick.png")}
                  alt=''
                  width='100'
                  height='100'>
                </img>
                <p>Thank you for your order</p>
                <button onClick={()=> props.reloadHome()}>Go Home</button>
        </div>
    )
}

export default OrderSucces;
