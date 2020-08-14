/*
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'reactstrap';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { getProducts } from '../store/actions/Products';
import Product from '../components/Product';

const Products = props => {
    const { group } = props;
    let storeProducts = useSelector(state => state.products.products);
    const isLoading = useSelector(state => state.products.isLoading);
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        group === 'search'
            ? dispatch(getProducts(`search/${params.id}`))
            : dispatch(getProducts(group));
    }, [group, dispatch, params]);

    if (group === 'offer') {
        storeProducts = storeProducts.filter(product => product.offer === 50);
    } else if (group === 'search') {
        storeProducts = storeProducts.filter(product =>
            product.name.toLowerCase().includes(params.id)
        );
    } else {
        storeProducts = storeProducts.filter(
            product => product.group === group
        );
    }

    const render = isLoading ? (
        <div className="Products-container">
            <Spinner color="primary" className="spinner" />
        </div>
    ) : (
        <div className="Products-container">
            <h1>{group}</h1>
            <div className="Products-products">
                {storeProducts.map(element => (
                    <Product
                        key={element._id}
                        id={element._id}
                        name={element.name}
                        measure={element.measure}
                        group={element.group}
                        description={element.description}
                        price={element.price}
                        image={element.image}
                        assessment={element.assessment}
                        quantity={element.quantity}
                        offer={element.offer}
                    />
                ))}
            </div>
        </div>
    );

    return render;
};

Products.propTypes = {
    group: PropTypes.string.isRequired,
};

export default Products;
*/
