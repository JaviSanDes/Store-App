import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import { withRouter } from 'react-router-dom';

import Spinner from '../../tools/Spinner/Spinner';
import Order from './Order/Order';
import classes from './Orders.css';
import StateBar from '../../components/Menubar/MenuBar';

class Orders extends Component {
  state= {
    auth: null
  }
  componentDidUpdate() {
    if(this.state.auth == null) {
      this.props.history.push('/');
    }
  }
  componentDidMount () {
      this.props.onFetchOrders(this.props.token, this.props.userId);
  }
  redirectHome = () => {
    this.setState({auth: this.props.auth})
  }

  render () {
      let orders = <Spinner />;
      if ( !this.props.loading ) {
          orders = this.props.orders.map( order => (
              <Order
                key={order.id}
                orderDate={order.dateOrder}
                orderData={order.orderData}
                price={order.price}
                products={[...order.products]}
              />
          ) )
      }
      if(!this.state.auth) {
        this.redirectHome()
      }
      return (
          <div className={classes.orders}>
              {orders}
              <StateBar />
          </div>
      );
  }
}

const mapStateToProps = state => {
  return {
      orders: state.order.ordersHistory,
      loading: state.order.loading,
      token: state.auth.token,
      userId: state.auth.userId,
      auth: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onFetchOrders: (token, userId) => dispatch( actions.fetchOrders(token, userId) )
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));
