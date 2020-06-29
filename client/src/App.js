import React from 'react';

import SideBar from './components/SideBar';
import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './routes/Routes';
import ShoppingCart from './components/shoppingCart';

const App = () => {
    return (
        <div className="App-container" data-test="component-app">
            <Header />
            <div className="App-body" data-test="App-body">
                <SideBar />
                <Routes />
                <ShoppingCart />
            </div>
            <Footer />
        </div>
    );
};

export default App;
