import React from 'react';
import classes from './Product.css';

const product= (props) => {
  var imagen=props.imagen;
  let total=props.total;
  if(total){total=total.toFixed(2);}
  return (
    <div className={classes.producto_caja}>
      <img className={classes.producto_imagen} src={require("../../../../static/imagenes-productos/"+imagen)} alt='' width='55' height='55'></img>
      <div className={classes.producto_info}>
          <p className={classes.producto_nombre}>{props.nombre}</p>
          <div className={classes.producto_presupuesto}>
              <div className={classes.producto_precio}>
                <p>Precio</p>
                  <p>{props.precio} €</p>
              </div>
              <div className={classes.producto_cantidad}>
                  <p>Cantidad</p>
                  <div className={classes.producto_cantidad_botones}>
                    <p className={classes.vezesComprado}>{props.vezesComprado}</p>
                  </div>
              </div>
              <div className={classes.producto_total}>
                  <p>Total</p>
                  <p>{total} €</p>
              </div>
          </div>

      </div>
    </div>
  )
}

export default product;
