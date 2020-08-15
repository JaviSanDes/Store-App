import React from 'react';
import CheckoutPhases from '../components/checkout/CheckoutPhases';
import Order from '../components/checkout/Order';

const Checkout = () => {
    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <CheckoutPhases />
            <Order />
        </div>
    );
};

export default Checkout;
