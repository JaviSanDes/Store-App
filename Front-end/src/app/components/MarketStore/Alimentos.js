import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import * as actionTypes from '../../store/actions/ActionTypes';

import classes from './Alimentos.css';
import Buscador from './Buscador/Buscador';
import Alimento from './Alimento/Alimento';
import Loading from '../../tools/Spinner/Spinner';

class Alimentos extends Component {
  
  displayMatches= (e) => {
    this.props.searchProduct(e.target.value);
  }
  pulsado= (e)=>{
      this.props.onOrderSummaryAdd();
      const product= this.props.alimentos[e.target.id];
      let id= null, lastID= 0;
      this.props.order.map((elmento, index)=> {
        lastID=index+1;
        if (elmento.nombre === product.nombre){
          id=index
        }
        return null
      })
      id!=null ? this.props.onAddProduct(id) : this.onOrderProduct(product, lastID);
  }
  onOrderProduct= (product) => {
    this.props.onOrderProduct(product);
    this.props.onAddProduct(0);
  }

  render () {
    let productos=null;
    if(this.props.alimentos){
      productos= (
        this.props.alimentos.map((alimento, index)=> (
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
          botonPulsado={(e)=> this.pulsado(e)}
      />
        ))
      )
    }
    if(this.props.loading) {
      productos = (<Loading />)
    }

    return (
        <div className={classes.caja}>
            <div className={classes.buscador}>
                <Buscador displayMatches={(e) => this.displayMatches(e)} />
            </div>   
            <div className={classes.alimentos_caja}>
            <div className={classes.prueba}></div>
                <div className={classes.productBox}>
                    <div className={classes.imgBox}>
                        <div className={classes.text}>
                            <h1>Good Food</h1>
                            <h1>always make a</h1>
                            <h1>good mood.</h1>
                        </div>
                        <img
                            src={require('../../static/imagenes-productos/alimentos.jpg')}
                            alt=''>
                        </img>
                    </div>
                    <div className={classes.productos}>{productos}</div>
                </div>
                <div className={classes.prueba2}></div>
            </div>
        
        </div>
    );
  };
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
        onOrderSummaryAdd: () => dispatch(actions.orderSumaryAdd()),
        searchProduct: (payload) => dispatch(actions.getSearchProduct(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Alimentos);
