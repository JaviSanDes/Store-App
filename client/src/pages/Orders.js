import React from 'react';
import Box from '../components/order/box';

const Orders = () => {
    return (
        <div className="orders-container">
            <div className="orders-ordersList">
                <h4>My Orders</h4>
                <Box />
                <Box />
                <Box />
                <Box />
                <Box />
                <Box />
            </div>
            <div className="orders-orderDetails">
                <h4>Order Details</h4>
                <div className="orders-orderList"></div>
            </div>
        </div>
    );
};

export default Orders;
