import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Home from '../pages/Home';
import Checkout from '../pages/Checkout';
import Settings from '../pages/Settings';
import Orders from '../pages/Orders';
import Login from '../pages/Login';

const Routes = () => {
    return (
        <div className="routes">
            <div>
                <Switch>
                    <Route path="/legume">
                        <Home group="legumes" />
                    </Route>
                    <Route path="/meat">
                        <Home group="meat" />
                    </Route>
                    <Route path="/vegetables">
                        <Home group="vegetables" />
                    </Route>
                    <Route path="/fruits">
                        <Home group="fruits" />
                    </Route>
                    <Route path="/fish">
                        <Home group="fish" />
                    </Route>
                    <Route path="/drinks">
                        <Home group="drinks" />
                    </Route>
                    <Route path="/frozen">
                        <Home group="frozen" />
                    </Route>
                    <Route path="/pasta">
                        <Home group="pasta" />
                    </Route>
                    <Route path="/sweets">
                        <Home group="sweets" />
                    </Route>
                    <Route path="/sauces">
                        <Home group="sauces" />
                    </Route>
                    <Route path="/search/:id">
                        <Home group="search" />
                    </Route>
                    <Route path="/checkout">
                        <Checkout />
                    </Route>
                    <Route path="/settings">
                        <Settings />
                    </Route>
                    <Route path="/orders">
                        <Orders />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>

                    <Route exact path="/">
                        <Home group="offer" />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};
export default withRouter(Routes);
