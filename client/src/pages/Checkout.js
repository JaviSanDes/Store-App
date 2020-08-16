import React from 'react';
import ShoppingCart from '../components/checkout/CheckoutPhases';
import Order from '../components/checkout/Order';

const Checkout = () => {
    return (
        <div className="checkout-container">
            <ShoppingCart />
            <Order />
        </div>
    );
};

export default Checkout;
