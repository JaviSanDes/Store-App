import React, { Component } from 'react';
import classes from './Oferts.css';
import axios from 'axios';
import Alimento from './Alimento/Alimento';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import * as actionTypes from '../../store/actions/ActionTypes';

class Oferts extends Component {
    state = {
        ofertList: [],
        left: 0,
        pixels:null,
        maxLeft: null
    }
    componentDidMount() {
        window.addEventListener("resize", this.resizeWindow);
        this.resizeWindow();
        axios.get('https://boiling-escarpment-88964.herokuapp.com/api/alimentos/oferta')
        .then( response => {
            var payload = null; 
                payload = [...response.data];
            this.setState({ofertList: payload});
        })
        .catch( error => {
        } );
    }
    resizeWindow = () => {
        window.innerWidth < 1400 ? this.setState({pixels: 213}) : this.setState({pixels: 328});
        window.innerWidth < 1400 ? this.setState({maxLeft: -2130}) : this.setState({maxLeft: -3130})
        this.setState({left: 0});
    }
    next = () => {
        if(this.state.left <= this.state.maxLeft) return
        this.setState({left: this.state.left - this.state.pixels})
    }
    prev = () => {
        if(this.state.left >= 0) return
        this.setState({left: this.state.left + this.state.pixels})
    }
    pulsado= (e)=>{
        let product = this.state.ofertList.find(elemento=>{
            return elemento.nombre === e
        });
        let checkForProduct = null;
        this.props.order.map((elemento, index) => {
            if (elemento.nombre === product.nombre) checkForProduct = index;
        });
        checkForProduct==null ? this.onOrderProduct(product) : this.props.onAddProduct(checkForProduct);
    }
    onOrderProduct= (product) => {
        this.props.onOrderProduct(product);
        this.props.onAddProduct(0);
      }
    render() {
        var miStyle = {
            left: `${this.state.left}px`
        }
        let productos=null;
        if(this.state.ofertList) {
            productos= (
                this.state.ofertList.map((alimento, index)=> (
                    <Alimento
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
                        imagen= {alimento.imagen}
                        botonPulsado={(e) => this.pulsado(e)}
                    />
                ))
              )
        }
        
        return (
            <div className={classes.ofertsBox}>
                <div className={classes.imageOffer}>
                    <img src={require("../../static/imagenes-productos/offer.png")}
                        alt=''
                        width='60'
                        height='60'>
                    </img>
                </div>
                <div className={classes.buttonsWrapper}>
                    <button className={classes.Button} onClick={this.prevSlide} onClick={this.prev}></button>
                    <button className={classes.Button} onClick={this.nextSlide} onClick={this.next}></button>
                </div>
                <div className={classes.ofertsBox2} style={miStyle}>      
                    {productos}
                </div>
                
            </div>
        )
    }
}

const mapStateToProps= state => {
    return {
      order: state.order.orders,
      alimentos: state.menu.alimentos,
      loading: state.menu.loading
    }
  }
  const mapDispatchToProps = dispatch => {
      return {
          onAddProduct: (id) => dispatch({type: actionTypes.ADD_PRODUCT, id: id}),
          onOrderProduct: (result) => dispatch({type: actionTypes.ORDER_PRODUCT, result: result}),
          onOrderSummaryAdd: () => dispatch(actions.orderSumaryAdd())
      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Oferts);