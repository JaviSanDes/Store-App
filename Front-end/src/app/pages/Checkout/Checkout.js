import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './Checkout.css';
import Product from './Product/Product';
import ContactDataElem from '../../components/ContactData/ContactData';
import * as actionTypes from '../../store/actions/ActionTypes';

class Checkout extends Component {
  state= {
    ContactData: false,
    auth: null
  }
  
  componentDidUpdate() {
    if(this.state.auth == null) {
      this.props.history.push('/');
    }
  }
  confirm= () => {
    this.setState({ContactData: !this.state.ContactData});
  }
  addProduct= (e) => {
    this.props.onAddProduct(e.target.id)
  }
  setStateAuth = () => {
    this.setState({auth: this.props.auth})
    
  }
  redirectHome = () => {
    this.props.history.push('/');
  }

  render() {
      let alimentos, ContactData = null;
      alimentos= (
        this.props.order.map((alimento, index)=> (
            <Product
              key={index}
              id={index}
              nombre={alimento.nombre}
              cantidad={alimento.cantidad}
              medida={alimento.medida}
              oferta={alimento.oferta}
              tipoOferta={alimento.tipoOferta}
              vezesComprado= {alimento.vezesComprado}
              valoracion= {alimento.valoracion}
              precio= {alimento.precio}
              sumar={(e) => this.addProduct(e)}
              restar={(e) => this.props.onRemoveProduct(e.target.id)}
              total={alimento.total}
              eliminateProduct={(e) => this.props.onEliminateProduct(e.target.id)}
              image={alimento.imagen}
            />
        ))
      )
      ContactData = 
      (
        <div className={classes.checkout}>
            <p className={classes.parrafoCheckout}>CHECK OUT</p>
            <div className={classes.checkoutOrder}>
              {alimentos}
            </div>
            <h4 className={classes.precioTotal}>Precio Total: {this.props.totalPrice.toFixed(2)} €</h4>
            <button onClick={this.confirm} className={classes.botonCHeckout}>Confirm</button>
        </div>
      )
      if( this.state.ContactData){
        ContactData= (
          <div>
            <ContactDataElem />
          </div>
        )
      }
      
      if(!this.state.auth) {
        this.setStateAuth()
      }
     
      return (
        <div>
            <button onClick={this.redirectHome}>Continue Shopping</button>
            {ContactData}
        </div>
      )
  }
}

const mapStateToProps= state => {
  return {
    order: state.order.orders,
    totalPrice: state.order.totalPrice,
    auth: state.auth.token
  }
}

const mapDispatchToProps= dispatch => {
  return {
    onAddProduct: (id) => dispatch({type: actionTypes.ADD_PRODUCT, id: id}),
    onRemoveProduct: (id) => dispatch({type: actionTypes.REMOVE_PRODUCT, id: id}),
    onEliminateProduct: (id) => dispatch({type: actionTypes.ELIMINATE_PRODUCT, id: id})
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));

