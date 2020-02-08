import React from "react"
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import loadable from 'react-loadable';
import styles from './Routes.css';

const LoadingComponent = () => <h3>please wait...</h3>;

const AsyncAboutComponent = loadable( {
  loader: () => import( '../About/About' ),
  loading: LoadingComponent
} );

const AsynContactComponent = loadable( {
  loader: () => import( '../Contact/Contact' ),
  loading: LoadingComponent
} );

const AsyncHomeComponent = loadable( {
  loader: () => import( '../Home/Home' ),
  loading: LoadingComponent
} );



const Routes = () => {
  return (
    <div>
        <div className={styles.links}>
          <Link to="/"><p>Home</p></Link>
          <Link to="/About"><p>About</p></Link>
          <Link to="/Contact"><p>Contact</p></Link>
        </div>
        <div>
          <Switch>
            <Route path="/About" component={ AsyncAboutComponent } />
            <Route path="/Contact" component={ AsynContactComponent } />
            <Route path="/" exact component={ AsyncHomeComponent } />
          </Switch>
        </div>
    </div>
  )
}
export default withRouter(Routes);

