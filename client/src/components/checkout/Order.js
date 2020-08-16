import React from 'react';
import { useSelector } from 'react-redux';
import Product2 from '../shoppingCart/Product2';

const Order = () => {
    const productsOrdered = useSelector(state => state.products.products);
    const order = useSelector(state => state.products.order);

    const products = [];
    order.map(id => {
        productsOrdered.map(product => {
            if (product._id === id && product.quantity > 0) {
                products.push(
                    <Product2
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
            <div className="order-products">{products}</div>
            <div className="order-info">
                <h4>Your Bags are Ready to Check Out!</h4>
                <p>
                    Discover goods you will love from brands that inspire. The
                    easiest way to open your own online store. Discover amazing
                    stuff or open your own store for free!
                </p>
                <p>
                    Below is a sample page for your cart, Created using pages
                    design UI Elementes
                </p>
            </div>
        </div>
    );
};

export default Order;
