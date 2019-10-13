import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import menuClass from './MenuBar.css';
import Order from '../TrollySummary/TrollySummary';

class Menubar extends Component {

  state = {
    isActive: false,
    userBoxActive: false,
    nombre: null
  }
  componentDidMount() {
    this.props.authCheckState();
    this.setState({nombre: this.props.nombre})
  }
  redirect = () => {
    if(!this.props.isAuthenticated){
      this.props.history.push('/auth');
    }
    this.setState({userBoxActive: !this.state.userBoxActive});
  }
  checkingOut= () => {
    this.props.isAuthenticated ? this.props.history.push('/checkout') : this.props.history.push('/auth');
    this.props.sendOrder();
  }
  orderToggle = () => {
    this.setState({isActive: !this.state.isActive});
  }
  logOut = () => {
    this.props.logOut();
  }
  ordersRedirect = () => {
    this.props.history.push('/orders');
  }
  render () {
    let orderStyle = null;
    this.state.isActive ? orderStyle = null : orderStyle = {display: 'none'};
    let userBox = null
    let signButton = (
      <button onClick={this.redirect}>SignUp or Register</button>
    )
    if(this.props.isAuthenticated){
      userBox = (
        <div className={menuClass.userBox}>
          <p>id: asds6dfdf889</p>
          <p>mail: email@mail.com</p>
          <button onClick={this.logOut}>LogOut</button>
          <button onClick={this.ordersRedirect}>My Orders</button>
        </div>
      )
      if(!this.state.userBoxActive){
        userBox = null
      }
      signButton = (
        <button onClick={this.redirect}>
          <img
            src={require("../../static/imagenes-productos/user.png")}
            alt=''
            width='20'
            height='20'
            className={menuClass.image}>
          </img>{this.state.nombre}</button>
      )
    }
    return (
        <div className={menuClass.rutas}>
            <div className={menuClass.home}>
                <div>
                  <Link to="/">
                      <img
                          src={require("../../static/imagenes-productos/home.png")}
                          alt=''
                          width='25'
                          height='25'>
                      </img>
                  </Link>
                </div>  
            </div>
            <div className={menuClass.space}></div>
            <div className={menuClass.imgBox}>
                  {signButton}
                  <img
                      src={require("../../static/imagenes-productos/trolley2.png")}
                      alt=''
                      width='20'
                      height='20'
                      className={menuClass.image}>
                  </img>
                  <p> {this.props.precioTotal.toFixed(2)} €</p>
            </div>
            <div className={menuClass.checkout} style={orderStyle}>
                <Order 
                  checkingOut={() => this.checkingOut()}
                  precioTotal={this.props.precioTotal}
                />
            </div>  
            <div className={menuClass.orderToggle} onClick={this.orderToggle}></div> 
            {userBox}
        </div>
    );
  };
}

const mapStateToProps= state => {
  return {
    precioTotal: state.order.totalPrice,
    isAuthenticated: state.auth.token !== null,
    nombre: state.auth.nombre
  }
}
const mapDispatchToProps = dispatch => {
  return {
      sendOrder: () => dispatch(actions.sendOrder()),
      logOut: () => dispatch(actions.logOut()),
      authCheckState: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Menubar));
