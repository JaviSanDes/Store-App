import React from 'react';
import propTypes from 'prop-types';

const CheckoutPhases = props => {
    const { phase } = props;
    return (
        <div className="checkout-phases-container">
            <div className="checkout-phases-line"></div>
            <div className="checkout-phases-circles">
                <div className="checkout-phase">
                    <div className="checkout-circle">
                        {phase !== 1 ? null : (
                            <div className="checkout-phases-greenCircle">
                                <p>1</p>
                            </div>
                        )}
                        {phase <= 1 ? null : (
                            <img
                                src={process.env.PUBLIC_URL + 'images/tick.png'}
                                alt=""
                                width="30px"
                                height="30px"
                            />
                        )}
                    </div>
                    <p>Your Cart</p>
                </div>
                <div className="checkout-phase">
                    <div className="checkout-circle">
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
                                width="30px"
                                height="30px"
                            />
                        )}
                    </div>
                    <p>Shipping</p>
                </div>
                <div className="checkout-phase">
                    <div className="checkout-circle">
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
                                width="30px"
                                height="30px"
                            />
                        )}
                    </div>
                    <p>Payment</p>
                </div>
                <div className="checkout-phase">
                    <div className="checkout-circle">
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
                                width="30px"
                                height="30px"
                            />
                        )}
                    </div>
                    <p>Summary</p>
                </div>
            </div>
        </div>
    );
};

CheckoutPhases.propTypes = {
    phase: propTypes.number.isRequired,
};
export default CheckoutPhases;
