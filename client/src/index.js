import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

function render(Component) {
    ReactDOM.render(
        <HashRouter>
            <Component />
        </HashRouter>,
        document.getElementById('root')
    );
}

render(App);
