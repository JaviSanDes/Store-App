import React from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';

const OrderItems = () => {
    const productsOrderItemsed = useSelector(state => state.products.products);
    const orderItems = useSelector(state => state.products.orderItems);

    const products = [];
    orderItems.map(id => {
        productsOrderItemsed.map(product => {
            if (product._id === id && product.quantity > 0) {
                products.push(
                    <Product
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        group={product.group}
                        description={product.description}
                        price={product.price}
                        image={product.image}
                        quantity={product.quantity}
                        measure={product.measure}
                    />
                );
            }
            return null;
        });
        return null;
    });
    return (
        <div className="orderItems-container">
            <div className="orderItems-products">
                <div className="orderItems-products-header">
                    <p className="orderItems-products-header-description">
                        Description
                    </p>
                    <p className="orderItems-products-header-qty">Qty</p>
                    <p className="orderItems-products-header-total">Total</p>
                    <p className="orderItems-products-header-X">#</p>
                </div>

                <div className="orderItems-products-list">{products}</div>
            </div>
        </div>
    );
};

export default OrderItems;
