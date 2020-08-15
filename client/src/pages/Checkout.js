import React from 'react';
import CehckoutPhases from '../components/checkout/ChceckoutPhases';
import Order from '../components/checkout/Order';

const Checkout = () => {
    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <CehckoutPhases />
            <Order />
        </div>
    );
};

export default Checkout;
