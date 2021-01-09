import React from 'react';
import PropTypes from 'prop-types';

const Box = props => {
    const { viewOrder, date, price, id } = props;
    console.log(id);
    return (
        <div className="orders-orderBox">
            <div className="orders-orderBox-header">
                <p>Order 1</p>
                <div className="orders-orderBox-header-status">
                    <p>Order Delivered</p>
                </div>
            </div>
            <div className="orders-orderInfo">
                <div>
                    <p>Order Date:</p>
                    <p>Delivery Time:</p>
                    <p className="orders-orderInfo-prcie">Total Price:</p>
                </div>
                <div className="orders-orderInfo-values">
                    <p>{date}</p>
                    <p>13th April</p>
                    <p className="orders-orderInfo-values-price">${price}</p>
                </div>
            </div>
            <button
                className="orders-orderBox-button"
                type="button"
                onClick={() => viewOrder(id)}
            >
                View order
            </button>
        </div>
    );
};

Box.propTypes = {
    id: PropTypes.number.isRequired,
    viewOrder: PropTypes.func.isRequired,
    price: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
};

export default Box;
