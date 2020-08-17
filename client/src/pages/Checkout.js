import React from 'react';
import ShoppingCart from '../components/checkout/CheckoutPhases';
import Order from '../components/checkout/Order';

const Checkout = () => {
    return (
        <div className="checkout-container">
            <ShoppingCart />
            <Order />
            <button className="checkout-nextButton" type="button">
                Next
            </button>
        </div>
    );
};

export default Checkout;
