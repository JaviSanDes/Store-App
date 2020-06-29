import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Home from '../pages/Home';

const Routes = () => {
    return (
        <div className="routes">
            <div>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};
export default withRouter(Routes);
