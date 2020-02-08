import React, { Component } from 'react';
import classes from './Alimento.css';

class Alimento extends Component {
  render () {
    const estrellaStyleGold={color: 'gold'};
    const estrellaStyleWhite={color: "lightgrey"};
    let contage= (this.props.valoracion).toFixed(0);
    const estrellas=[];
    let estrellasBlancas=5-contage;
    for(let i=0; contage>i; i++)(
        estrellas.push(estrellaStyleGold)
    )
    for(let i=0; estrellasBlancas>i; i++)(
        estrellas.push(estrellaStyleWhite)
    )
    let starts=(
      <div className={classes.rate_area}>
        {estrellas.map((label, i) =>(
          <label style={label} key={i} className={classes.estrellas}></label>
        ))}
      </div>
    )
    var imagen=this.props.imagen;

    return (
        <div className={classes.alimento_caja} ref='bla'>
            <div className={classes.imgBox}>
                <img
                  src={require("../../../static/imagenes-productos/"+imagen)}
                  alt=''
                  width='120'
                  height='120'>
                </img>
            </div>              
            <div className={classes.alimento_descripcion}>
                <h4 className={classes.descripcion}>{this.props.nombre}</h4>
                <h4 className={classes.descripcion2}>{this.props.cantidad}</h4>             
                <h3 className={classes.precio}>{this.props.precio} €</h3>
                <div className={classes.alimento_boton_caja}>
                    <button
                      onClick={this.props.botonPulsado}
                      id={this.props.id}
                      className={classes.alimento_boton}>Add
                    </button>
                </div>
                {starts}
            </div>
        </div>
    )
  }
    
}

export default Alimento;
