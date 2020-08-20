import React from 'react';
import CheckoutPhases from '../components/checkout/CheckoutPhases';
// import Order from '../components/checkout/Order';
import Shipping from '../components/checkout/Shipping';

const Checkout = () => {
    return (
        <div className="checkout-container">
            <CheckoutPhases />
            <Shipping />
            <button className="checkout-nextButton" type="button">
                Next
            </button>
        </div>
    );
};

export default Checkout;
