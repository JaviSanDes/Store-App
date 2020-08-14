import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './routes/Routes';

const App = () => {
    return (
        <div className="App-container" data-test="component-app">
            <Header />
            <div className="App-body" data-test="App-body">
                <Routes />
            </div>
            <Footer />
        </div>
    );
};

export default App;
