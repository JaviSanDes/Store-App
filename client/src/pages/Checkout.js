import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CheckoutPhases from '../components/checkout/CheckoutPhases';
import Order from '../components/checkout/Order';
import Shipping from '../components/checkout/Shipping';
import Payment from '../components/checkout/Payment';
import Summary from '../components/checkout/Summary';

const Checkout = () => {
    const [phase, setPhase] = useState(1);
    const totalPrice = useSelector(state => state.products.totalPrice);

    const calculate = () => {
        const heightDimension =
            window.innerWidth < 350
                ? window.innerHeight * 0.85
                : window.innerHeight * 0.88;
        // heightDimension = heightDimension > 700 && 700;
        const element = document.getElementById('checkout-container-id');
        element.style.height = heightDimension + 'px';
        element.style.minHeight = heightDimension + 'px';
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
    };
    let Phase = <Order />;
    switch (phase) {
        case 1:
            Phase = <Order nextPhase={phaseHandler} />;
            break;
        case 2:
            Phase = <Shipping submit={phaseHandler} />;
            break;
        case 3:
            Phase = <Payment submit={phaseHandler} />;
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
            <div className="checkout2">
                <div className="checkout-price">
                    <div className="checkout-price-name">
                        <p>Sub-Total</p>
                        <p>VAT</p>
                        <h4>Total Price</h4>
                    </div>
                    <div>
                        <p>{totalPrice.toFixed(2)}€</p>
                        <p> {((totalPrice * 21) / 100).toFixed(2)}€</p>
                        <h4>
                            {((totalPrice * 21) / 100 + totalPrice).toFixed(2)}€
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
