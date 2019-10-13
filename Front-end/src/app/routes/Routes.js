import React, {Component} from "react";
import { Route, Switch, withRouter } from 'react-router-dom';
import loadable from 'react-loadable';
import styles from './Routes.css';

const LoadingComponent = () => <h3>please wait...</h3>;

const AsyncHomeComponent = loadable( {
  loader: () => import( '../pages/Shop/Shop' ),
  loading: LoadingComponent
} );

const AsyncCheckoutComponent = loadable( {
  loader: () => import( '../pages/Checkout/Checkout' ),
  loading: LoadingComponent
} );

const AsyncAuthComponent = loadable( {
  loader: () => import( '../pages/Auth/Auth' ),
  loading: LoadingComponent
} );

const AsyncOrdersComponent = loadable( {
  loader: () => import( '../pages/Orders/Orders' ),
  loading: LoadingComponent
} );


class Routes extends Component{
  render() {
      return (
        <div className={styles.Container}>
          <Switch>
            <Route path="/Checkout" component={ AsyncCheckoutComponent } />
            <Route path="/Auth" component={ AsyncAuthComponent } />
            <Route path="/Orders" component={ AsyncOrdersComponent } />
            <Route path="/" exact component={ AsyncHomeComponent } />
          </Switch>
        </div>
      )
  }
  
  
}
export default withRouter(Routes);