import React, { useState } from 'react';
import CheckoutPhases from '../components/checkout/CheckoutPhases';
import Order from '../components/checkout/Order';
import Shipping from '../components/checkout/Shipping';
import Payment from '../components/checkout/Payment';
import Summary from '../components/checkout/Summary';

const Checkout = () => {
    const [phase, setPhase] = useState(1);

    const phaseHandler = () => {
        // eslint-disable-next-line no-shadow
        setPhase(phase => (phase += 1));
    };
    let Phase = <Order />;
    switch (phase) {
        case 1:
            Phase = <Order />;
            break;
        case 2:
            Phase = <Shipping />;
            break;
        case 3:
            Phase = <Payment />;
            break;
        case 4:
            Phase = <Summary />;
            break;
        default:
        // code block
    }
    return (
        <div className="checkout-container">
            <CheckoutPhases phase={phase} />
            {Phase}
            <button
                className="checkout-nextButton"
                type="button"
                onClick={phaseHandler}
            >
                Next
            </button>
        </div>
    );
};

export default Checkout;
