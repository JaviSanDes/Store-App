import React from 'react';

const Box = () => {
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
                    <p>7th April 2019</p>
                    <p>13th April</p>
                    <p className="orders-orderInfo-values-price">$249.7</p>
                </div>
            </div>
            <button className="orders-orderBox-button" type="button">
                View order
            </button>
        </div>
    );
};

export default Box;
