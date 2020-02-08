import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

import Routes from './routes/Routes';

class App extends Component {
  state = {

  };
  render() {
    return (
      <div>
        <Routes />
      </div>
    )
  }
}

export default hot(App);
