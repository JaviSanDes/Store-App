import React from 'react';
import { Progress } from 'reactstrap';
import Box from '../components/orders/box';
import OrderItems from '../components/orders/OrderItems';

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
                <div className="orders-delivery-info">
                    <div className="orders-delivery-info-1">
                        <p>Delivery Address</p>
                        <p>1865 Chenoweth Drive, Nashville, Tennessee</p>
                        <div>
                            <p>Order Date: 7th April 2019</p>
                            <p>Delivery Time: 13th April</p>
                        </div>
                    </div>
                    <div className="orders-delivery-info-1">
                        <p>Sub Total $279</p>
                        <p>Discount $0</p>
                        <p>Delivery Fee $39</p>
                        <p>Total $318</p>
                    </div>
                </div>
                <div className="orders-steps">
                    <div className="orders-circle orders-ticked">
                        <img
                            src={process.env.PUBLIC_URL + 'images/tick2.png'}
                            className="orders-tick"
                            alt="img"
                        />
                    </div>
                    <div className="orders-circle orders-ticked">
                        <img
                            src={process.env.PUBLIC_URL + 'images/tick2.png'}
                            className="orders-tick"
                            alt="img"
                        />
                    </div>
                    <div className="orders-circle">3</div>
                </div>
                <Progress value={50} className="orders-progress" />
                <div className="orders-steps">
                    <p>Order Recived</p>
                    <p>Order On The Way</p>
                    <p>Order Delivered</p>
                </div>

                <div className="orders-orderProducts">
                    <OrderItems />
                </div>
            </div>
        </div>
    );
};

export default Orders;
