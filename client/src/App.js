import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authCheckState } from './store/actions/auth';
import Header from './components/Header';
import Routes from './routes/Routes';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authCheckState());
    });
    return (
        <div className="App-container" data-test="component-app">
            <Header />
            <div className="App-body" data-test="App-body">
                <Routes />
            </div>
        </div>
    );
};

export default App;
