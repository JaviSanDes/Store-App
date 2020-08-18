import React from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';

const Order = () => {
    const productsOrdered = useSelector(state => state.products.products);
    const order = useSelector(state => state.products.order);
    const totalPrice = useSelector(state => state.products.totalPrice);

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
                <div className="order-products-list">{products}</div>
            </div>
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
                <div className="order-subTotal">
                    <p className="order-subTotal-text">Sub-Total</p>
                    <p className="order-subTotal-num">23€</p>
                </div>
                <div className="order-VAT">
                    <p className="order-VAT-text">VAT</p>
                    <p className="order-VAT-num">23€</p>
                </div>

                <div className="order-totalPrice">
                    <h3 className="order-totalPrice-text">Total</h3>
                    <h3 className="order-totalPrice-num">
                        {totalPrice.toFixed(2)}€
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Order;
