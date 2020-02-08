import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import * as actionTypes from '../../store/actions/ActionTypes';

import classes from './TrollySummary.css';
import Producto from './Producto/Producto';

class TrollySummary extends Component {
  state ={
    screenSize: 0
  }
  componentDidMount() {
    window.addEventListener("resize", this.resizeFunction);
    this.resizeFunction();
  }
  resizeFunction = () => {
    this.setState({screenSize: window.innerWidth});
  }
  checkingOut= () => {
    this.props.isAuthenticated ? this.props.history.push('/checkout') : this.props.history.push('/auth');
    this.props.sendOrder()
  }
  addProduct= (e) => {
    this.props.onAddProduct(e.target.id);
  }
  eliminateProduct= (e)=> {
    this.props.onEliminateProduct(e.target.id);
  }

  render () {
    
    let products= this.props.order;
    let producto=null;
    producto=(
      products.map((order, i) => (
        <Producto
          key={i}
          id={i}
          nombre={order.nombre}
          cantidad={order.cantidad}
          medida={order.medida}
          oferta={order.oferta}
          tipoOferta={order.tipoOferta}
          vezesComprado= {order.vezesComprado}
          valoracion= {order.valoracion}
          precio= {order.precio}
          sumar={(e) => this.addProduct(e)}
          restar={(e) => this.props.onQuitarProducto(e.target.id)}
          total={order.total}
          eliminateProduct={(e) => this.eliminateProduct(e)}
          image={order.imagen}
        />
      ))
    );

    return (
      <div className={classes.Order_caja}>
          <h3 className={classes.orderSummary}>Order Summary</h3>
          <h5 className={classes.totalPrice}>Total Price: {this.props.precioTotal.toFixed(2)} €</h5>
          
          <div className={classes.scroll4}>
            <div className={classes.content}>
              {producto}
            </div>
          </div>   
          <button className={classes.boton} onClick={this.checkingOut}>CHECK OUT!</button>
      </div>
    )
  }
}

const mapStateToProps= state => {
  return {
    isAuthenticated: state.auth.token !== null,
    precioTotal: state.order.totalPrice,
    order: state.order.orders
  }
}
const mapDispatchToProps = dispatch => {
    return {
        sendOrder: () => dispatch(actions.sendOrder()),
        onAddProduct: (id) => dispatch({type: actionTypes.ADD_PRODUCT, id: id}),
        onQuitarProducto: (id) => dispatch({type: actionTypes.REMOVE_PRODUCT, id: id}),
        onEliminateProduct: (id) => dispatch({type: actionTypes.ELIMINATE_PRODUCT, id: id})
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (TrollySummary));
