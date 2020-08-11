import React from 'react';

import Products from './Products';

const Home = () => {
    return (
        <div className="Home-container">
            <h1>HOME</h1>
            <img
                src={process.env.PUBLIC_URL + `images/alimentos2.png`}
                className="home-img"
                alt="img"
            />
            <div className="home-products">
                <Products group="offer" />
            </div>
        </div>
    );
};

export default Home;
