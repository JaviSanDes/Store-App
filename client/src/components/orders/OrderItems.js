import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';

const OrderItems = props => {
    const { products } = props;
    /*
    const handleUserKeyPress = useCallback(() => {
        setTimeout(() => {
            const down = document.getElementById('prueba3');
            const header = document.getElementById('prueba4');
            const productList = document.getElementById('prueba5');
            const result = down.offsetHeight - header.offsetHeight;
            productList.style.height = `${result}px`;
            if (window.innerWidth <= 500) {
                const porcent = (down.offsetHeight * 80) / 100;
                productList.style.height = `${result + porcent}px`;
            }
        }, 500);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleUserKeyPress);
        handleUserKeyPress();
        return () => {
            window.removeEventListener('resize', handleUserKeyPress);
        };
    }, []);
    */

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
                {products.map(product => (
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
                ))}
            </div>
        </div>
    );
};

OrderItems.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    products: PropTypes.array.isRequired,
};

export default OrderItems;
