import React, {Component} from 'react';
import Product from './Product/Product';
import classes from './Order.css';

class Order extends Component {
  state= {
    style: false,
    width: null,
    height: null
  }

  componentDidMount(){
    window.addEventListener("resize", this.updateDimensions);
    this.setState({width: window.innerWidth, height: window.innerHeight})
  }
  updateDimensions= () => {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  activar= () => {
    this.setState({style: !this.state.style});
  }
  render(){
    let alimentos=null;
      alimentos= (
        this.props.products.map((alimento, index)=> (
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
            total={alimento.total}
            imagen={alimento.imagen}
          />
        ))
      )

    const orderData = [];
    for (let key in this.props.orderData) {
        orderData.push({
            id: key,
            config: this.props.orderData[key]
        });
    }
    let orderDataa= (
      orderData.map(elem => {
        return <li>{elem.id}: {elem.config}</li>
      })
    )
    let estilo=null;
    if(this.state.style){
      estilo={
        width: this.state.width,
        height: this.state.height,
        left: '0',
        top: '0'
      }
    }
    let alimentosStyle=null;
    if(this.state.width < 500){
      alimentosStyle={
        height: this.state.height,
        marginTop: '0'
      }
    }

    return (
      <div className={classes.orderBox} onClick={this.activar}>
        <div>
          <h4>Date: {this.props.orderDate}</h4>
          <h5>Order Data:</h5>
            <ul className={classes.dataList}>
                {orderDataa}
            </ul>
        </div>
        <div className={classes.alimentosBox} style={estilo}>
          <div className={classes.alimentos} style={alimentosStyle}>
            <div className={classes.alimento}>{alimentos}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Order;
