import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';

const OrderItems = () => {
    const productsOrderItemsed = useSelector(state => state.products.products);
    const orderItems = useSelector(state => state.products.order);

    const handleUserKeyPress = useCallback(() => {
        console.log('ENTRAAAA');
        setTimeout(() => {
            const down = document.getElementById('prueba3');
            const header = document.getElementById('prueba4');
            const productList = document.getElementById('prueba5');
            const result = down.offsetHeight - header.offsetHeight;
            productList.style.height = `${result}px`;
        }, 500);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleUserKeyPress);
        handleUserKeyPress();
        return () => {
            window.removeEventListener('resize', handleUserKeyPress);
        };
    }, []);

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
            <div className="orderItems-products-header" id="prueba4">
                <p className="orderItems-products-header-description">
                    Description
                </p>
                <p className="orderItems-products-header-qty">Qty</p>
                <p className="orderItems-products-header-total">Price</p>
            </div>
            <div className="orderItems-products-list" id="prueba5">
                {products}
            </div>
        </div>
    );
};

export default OrderItems;
