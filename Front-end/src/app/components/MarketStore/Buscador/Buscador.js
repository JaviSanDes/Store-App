import React from 'react';
import classes from './Buscador.css';

const buscador= (props) => {
    return (
        <div className={classes.buscadorClass}>
            <div>
            <input
            type='text'
            onChange={props.displayMatches}
            onKeyUp={props.displayMatches}
            className={classes.buscadorInput}
            placeholder='Search'
            ></input>
            </div>
        </div>
    )
}

export default buscador;
