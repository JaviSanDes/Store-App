import React  from 'react';
import classes from './Producto.css';

const producto= (props) => {
  let imagen= props.image;
  let total=props.total;
  if(total){total=total.toFixed(2);}

  return (
    <div className={classes.producto_caja}>
        <img className={classes.producto_imagen} src={require("../../../static/imagenes-productos/"+imagen)} alt='' width='55' height='55'></img>
        <div className={classes.producto_info}>
            <div className={classes.product_title}>
            <h4 className={classes.producto_nombre}>{props.nombre}</h4>
            <img id={props.id} onClick={props.eliminateProduct} src={require("../../../static/imagenes-productos/bin.png")} alt='' width='22' height='15'></img>
            </div>
            
            <div className={classes.producto_presupuesto}>
                <div className={classes.producto_precio}>
                  <h5 className={classes.h5}>Price</h5>
                    <p>{props.precio} €</p>
                </div>
                <div className={classes.producto_cantidad}>
                    <h5 className={classes.h5}>Quantity</h5>
                    <div className={classes.producto_cantidad_botones}>
                      <button className={classes.producto_boton} id={props.id} nombre={props.nombre} onClick={props.sumar}>+</button>
                      <p className={classes.vezesComprado}>{props.vezesComprado}</p>
                      <button className={classes.producto_boton} id={props.id} nombre={props.nombre} onClick={props.restar}>-</button>
                    </div>
                </div>
                <div className={classes.producto_total}>
                    <h5 className={classes.h5}>Total</h5>
                    <p>{total} €</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default (producto);
