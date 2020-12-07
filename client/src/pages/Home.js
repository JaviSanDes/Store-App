import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'reactstrap';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { getProducts } from '../store/actions/Products';
import Product from '../components/Product';
import SideBar from '../components/SideBar';
import ShoppingCart from '../components/shoppingCart/shoppingCart';
import Footer from '../components/Footer';

const Home = props => {
    const { group } = props;
    let storeProducts = useSelector(state => state.products.products);
    const isLoading = useSelector(state => state.products.isLoading);
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        const header = document.getElementById('Header-container-id');
        header.style.position = 'fixed';
    }, []);

    useEffect(() => {
        group === 'search'
            ? dispatch(getProducts(`search/${params.id}`))
            : dispatch(getProducts(group));
    }, [group]);

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
    return (
        <div>
            <div className="Home-container">
                <SideBar />
                <div>
                    {group !== 'offer' ? null : (
                        <img
                            src={
                                process.env.PUBLIC_URL + `images/alimentos2.png`
                            }
                            className="home-img"
                            alt="img"
                        />
                    )}
                    <div className="Home-body">
                        <div className="home-products">{render}</div>
                    </div>
                </div>

                <ShoppingCart />
            </div>
            <Footer />
        </div>
    );
};

Home.propTypes = {
    group: PropTypes.string.isRequired,
};

export default Home;
