import React, { useEffect, useState } from 'react';
import CheckoutPhases from '../components/checkout/CheckoutPhases';
import Order from '../components/checkout/Order';
import Shipping from '../components/checkout/Shipping';
import Payment from '../components/checkout/Payment';
import Summary from '../components/checkout/Summary';

const Checkout = () => {
    const [phase, setPhase] = useState(1);

    const calculate = () => {
        const header = document.getElementById('Header-container-id');
        header.style.position = 'absolute';
        const heightDimension =
            window.innerWidth < 370
                ? window.innerHeight * 0.85
                : window.innerHeight * 0.88;
        const element = document.getElementById('checkout-container-id');
        // element.style.height = heightDimension + 'px';
        element.style.minHeight =
            heightDimension > 700 ? '700px' : heightDimension + 'px';
    };

    const backHandler = () => {
        // eslint-disable-next-line no-shadow
        setPhase(phase => (phase -= 1));
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        window.addEventListener('resize', calculate);
        calculate();
        return () => {
            window.removeEventListener('resize', calculate);
        };
    }, [calculate]);

    const phaseHandler = () => {
        // eslint-disable-next-line no-shadow
        setPhase(phase => (phase += 1));
        window.scrollTo(0, 0);
    };
    let Phase = <Order />;
    switch (phase) {
        case 1:
            Phase = <Order nextPhase={phaseHandler} />;
            break;
        case 2:
            Phase = (
                <Shipping submit={phaseHandler} backHandler={backHandler} />
            );
            break;
        case 3:
            Phase = <Payment submit={phaseHandler} backHandler={backHandler} />;
            break;
        case 4:
            Phase = <Summary />;
            break;
        default:
        // code block
    }
    return (
        <div className="checkout-container" id="checkout-container-id">
            <div className="checkout-pahses">
                <CheckoutPhases phase={phase} />
            </div>
            <div className="checkout-content">{Phase}</div>
        </div>
    );
};

export default Checkout;
