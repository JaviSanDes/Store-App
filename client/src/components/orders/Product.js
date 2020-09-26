import React from 'react';
import PropTypes from 'prop-types';

const Product2 = props => {
    const { name, price, image, quantity, measure } = props;

    return (
        <div className="orderItems-product">
            <div className="orderItems-image">
                <img
                    src={process.env.PUBLIC_URL + `images/${image}`}
                    alt="img"
                />
            </div>
            <div className="orderItems-product-description">
                <p className="orderItems-product-description-name">
                    <b>{name}</b>
                </p>
                <p className="orderItems-product-description-price">
                    {measure}, {price}€/und.
                </p>
            </div>
            <div className="order-product-description-buttons">
                <div>{quantity}</div>
            </div>
            <div className="orderItems-product-price-total">
                {(price * quantity).toFixed(2)} €
            </div>
        </div>
    );
};

Product2.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    measure: PropTypes.string.isRequired,
};

export default Product2;
