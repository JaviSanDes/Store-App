import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import initStore from './store/index';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

function render(Component) {
    ReactDOM.render(
        <Provider store={initStore}>
            <HashRouter>
                <Component />
            </HashRouter>
        </Provider>,
        document.getElementById('root')
    );
}

render(App);
