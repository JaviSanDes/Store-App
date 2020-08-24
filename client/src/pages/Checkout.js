import React from 'react';
import CheckoutPhases from '../components/checkout/CheckoutPhases';
// import Order from '../components/checkout/Order';
// import Shipping from '../components/checkout/Shipping';
// import Payment from '../components/checkout/Payment';
import Summary from '../components/checkout/Summary';

const Checkout = () => {
    return (
        <div className="checkout-container">
            <CheckoutPhases />
            <Summary />
            <button className="checkout-nextButton" type="button">
                Next
            </button>
        </div>
    );
};

export default Checkout;
