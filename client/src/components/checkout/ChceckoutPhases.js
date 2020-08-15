import React, { useState } from 'react';

const CheckoutPhases = () => {
    const [phase, setPhase] = useState(1);
    const clickHander = num => {
        setPhase(num);
    };
    return (
        <div className="checkout-phases-container">
            <div className="checkout-phases-line"></div>
            <div className="checkout-phases-circles">
                <div className="checkout-phase">
                    <div
                        className="checkout-circle"
                        onClick={() => clickHander(1)}
                        role="button"
                    >
                        {phase !== 1 ? null : (
                            <div className="checkout-phases-greenCircle">
                                <p>1</p>
                            </div>
                        )}
                        {phase <= 1 ? null : (
                            <img
                                src={process.env.PUBLIC_URL + 'images/tick.png'}
                                alt=""
                                width="40px"
                                height="40px"
                            />
                        )}
                    </div>
                    <p>Your Cart</p>
                </div>
                <div className="checkout-phase">
                    <div
                        className="checkout-circle"
                        onClick={() => clickHander(2)}
                        role="button"
                    >
                        {phase > 1 ? null : <p>2</p>}
                        {phase !== 2 ? null : (
                            <div className="checkout-phases-greenCircle">
                                <p>2</p>
                            </div>
                        )}
                        {phase <= 2 ? null : (
                            <img
                                src={process.env.PUBLIC_URL + 'images/tick.png'}
                                alt=""
                                width="40px"
                                height="40px"
                            />
                        )}
                    </div>
                    <p>Shipping</p>
                </div>
                <div className="checkout-phase">
                    <div
                        className="checkout-circle"
                        onClick={() => clickHander(3)}
                        role="button"
                    >
                        {phase > 2 ? null : <p>3</p>}
                        {phase !== 3 ? null : (
                            <div className="checkout-phases-greenCircle">
                                <p>3</p>
                            </div>
                        )}
                        {phase <= 3 ? null : (
                            <img
                                src={process.env.PUBLIC_URL + 'images/tick.png'}
                                alt=""
                                width="40px"
                                height="40px"
                            />
                        )}
                    </div>
                    <p>Payment</p>
                </div>
                <div className="checkout-phase">
                    <div
                        className="checkout-circle"
                        onClick={() => clickHander(4)}
                        role="button"
                    >
                        {phase > 3 ? null : <p>4</p>}
                        {phase !== 4 ? null : (
                            <div className="checkout-phases-greenCircle">
                                <p>4</p>
                            </div>
                        )}
                        {phase <= 4 ? null : (
                            <img
                                src={process.env.PUBLIC_URL + 'images/tick.png'}
                                alt=""
                                width="40px"
                                height="40px"
                            />
                        )}
                    </div>
                    <p>Summary</p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPhases;
