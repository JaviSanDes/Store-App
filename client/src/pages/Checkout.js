import React, { useState } from 'react';
import CheckoutPhases from '../components/checkout/CheckoutPhases';
import Order from '../components/checkout/Order';
import Shipping from '../components/checkout/Shipping';
import Payment from '../components/checkout/Payment';
import Summary from '../components/checkout/Summary';
// import { useSelector } from 'react-redux';

const Checkout = () => {
    const [phase, setPhase] = useState(1);
    // const totalPrice = useSelector(state => state.products.totalPrice);

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

/*
<div className="order-info">
<div className="order-subTotal">
    <p className="order-subTotal-text">Sub-Total</p>
    <p className="order-subTotal-num">
        {totalPrice.toFixed(2)}€
    </p>
</div>
<div className="order-VAT">
    <p className="order-VAT-text">VAT</p>
    <p className="order-VAT-num">
        {((totalPrice * 21) / 100).toFixed(2)}€
    </p>
</div>

<div className="order-totalPrice">
    <h3 className="order-totalPrice-text">Total</h3>
    <h3 className="order-totalPrice-num">
        {((totalPrice * 21) / 100 + totalPrice).toFixed(2)}€
    </h3>
</div>
</div>
*/
