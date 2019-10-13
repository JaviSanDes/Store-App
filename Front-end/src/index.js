import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App.js';
require("./index.css");

import { HashRouter } from 'react-router-dom';
//redux:
import { Provider } from 'react-redux';
import { createStore,  applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//reducer
import order from './app/store/reducers/order';
import authReducer from './app/store/reducers/Auth';
import shop from './app/store/reducers/shop';
import menuReducer from './app/store/reducers/menu';

const rootReducer = combineReducers({
    order: order,
    auth: authReducer,
    shop: shop,
    menu: menuReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));

function render(Component) {
    ReactDOM.render(
        <Provider store={store}>
            <HashRouter>
                <Component />
            </HashRouter>
        </Provider>,           
      document.getElementById("root")
    )
}
render(App);

