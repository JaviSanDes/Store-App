import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ProductModal from './modal/ProductModal';
import { addProduct } from '../store/actions/Products';

import Buttons from './Buttons';

const Product = props => {
    const {
        id,
        name,
        measure,
        description,
        price,
        image,
        offer,
        quantity,
        group,
    } = props;

    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const [imageLoading, setImageLoading] = useState(true);

    const toggleModal = e => {
        if (e.target.className !== 'avoid-modal') setVisible(true);
    };

    return (
        <div
            className="product-container"
            role="button"
            onClick={e => toggleModal(e)}
        >
            {offer > 0 ? <div className="product-offer">{offer}%</div> : null}

            <div className="product-image">
                {!imageLoading ? null : (
                    <div
                        style={{
                            background: 'rgb(250, 250, 250)',
                            height: '200px',
                            width: '100%',
                        }}
                    />
                )}
                <img
                    style={!imageLoading ? {} : { display: 'none' }}
                    src={process.env.PUBLIC_URL + `images/products/${image}`}
                    onLoad={() => setImageLoading(false)}
                    alt={name}
                />
            </div>
            <h1 className="product-name">{name}</h1>
            <p className="product-measure">{measure}</p>
            <div className="product-price">
                <p className="product-price-value">{price} €</p>

                {quantity > 0 ? (
                    <Buttons id={id} quantity={quantity} />
                ) : (
                    <div
                        role="button"
                        id="product-price-button"
                        className="avoid-modal"
                        onClick={() => dispatch(addProduct(id))}
                    >
                        Add to Cart
                    </div>
                )}
            </div>
            <div className="product-stars">
                {' '}
                &#9733; &#9733; &#9733; &#9733; &#9733;
            </div>
            <ProductModal
                id={id}
                name={name}
                measure={measure}
                description={description}
                price={price}
                image={image}
                isvisible={visible}
                quantity={quantity}
                group={group}
                setVisible={() => setVisible(!visible)}
                offer={offer}
            />
        </div>
    );
};

Product.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    measure: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    group: PropTypes.string.isRequired,
    offer: PropTypes.number.isRequired,
};

export default Product;
