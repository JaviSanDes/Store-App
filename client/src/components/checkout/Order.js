import React from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';

const Order = () => {
    const productsOrdered = useSelector(state => state.products.products);
    const order = useSelector(state => state.products.order);

    const products = [];
    order.map(id => {
        productsOrdered.map(product => {
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
        <div className="order-container">
            <div className="order-products">
                <div className="order-products-header">
                    <p className="order-products-header-description">
                        Description
                    </p>
                    <p className="order-products-header-qty">Qty</p>
                    <p className="order-products-header-X">Total</p>
                </div>

                <div className="order-products-list">{products}</div>
            </div>
        </div>
    );
};

export default Order;
