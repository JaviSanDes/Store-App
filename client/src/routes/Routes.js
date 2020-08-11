import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Home from '../pages/Home';
import Products from '../pages/Products';

const Routes = () => {
    return (
        <div className="routes">
            <div>
                <Switch>
                    <Route path="/legume">
                        <Products group="legumes" />
                    </Route>
                    <Route path="/meat">
                        <Products group="meat" />
                    </Route>
                    <Route path="/vegetables">
                        <Products group="vegetables" />
                    </Route>
                    <Route path="/fruits">
                        <Products group="fruits" />
                    </Route>
                    <Route path="/fish">
                        <Products group="fish" />
                    </Route>
                    <Route path="/drinks">
                        <Products group="drinks" />
                    </Route>
                    <Route path="/frozen">
                        <Products group="frozen" />
                    </Route>
                    <Route path="/pasta">
                        <Products group="pasta" />
                    </Route>
                    <Route path="/sweets">
                        <Products group="sweets" />
                    </Route>
                    <Route path="/sauces">
                        <Products group="sauces" />
                    </Route>
                    <Route path="/search/:id">
                        <Products group="search" />
                    </Route>

                    <Route exact path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};
export default withRouter(Routes);
