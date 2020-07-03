import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Home from '../pages/Home';
import Products from '../pages/Products';

const Routes = () => {
    return (
        <div className="routes">
            <div>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/products">
                        <Products />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};
export default withRouter(Routes);
