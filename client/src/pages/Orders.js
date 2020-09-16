import React from 'react';

const Orders = () => {
    return (
        <div className="orders-container">
            <div className="orders-ordersList">
                <h4>My Orders</h4>
                <div className="orders-orderBox">
                    <div className="orders-orderBox-header">
                        <p>Order 1</p>
                        <p className="orders-orderBox-header-status">
                            Order Delivered
                        </p>
                    </div>
                    <div className="orders-orderInfo">
                        <div>
                            <p>Order Date:</p>
                            <p>Delivery Time:</p>
                            <p className="orders-orderInfo-prcie">
                                Total Price:
                            </p>
                        </div>
                        <div className="orders-orderInfo-values">
                            <p>7th April 2019</p>
                            <p>13th April</p>
                            <p className="orders-orderInfo-values-price">
                                $249.7
                            </p>
                        </div>
                    </div>
                </div>
                <div className="orders-orderBox"></div>
                <div className="orders-orderBox"></div>
                <div className="orders-orderBox"></div>
            </div>
            <div className="orders-orderDetails">
                <h4>Order Details</h4>
            </div>
        </div>
    );
};

export default Orders;
