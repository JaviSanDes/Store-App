import React from 'react';
import CheckoutPhases from '../components/checkout/CheckoutPhases';
import Order from '../components/checkout/Order';

const Checkout = () => {
    return (
        <div className="checkout-container">
            <CheckoutPhases />
            <Order />
            <button className="checkout-nextButton" type="button">
                Next
            </button>
        </div>
    );
};

export default Checkout;
