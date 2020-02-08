import React, { Component } from 'react';
import classes from './LateralMenu.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class LateralMenu extends Component {

    state = {
        isActive: true,
    }
    toggleMenu = () => {
        this.setState({isActive: !this.state.isActive});
    }
    menuSelected = (e) => {
        let target = e.target.outerHTML;
        let finalTarget = target.substr(3).slice(0, -4).toLowerCase();
        this.props.selectedMenu(finalTarget);
    }

    render () {
        
        let boxStyle = null;
        this.state.isActive ? boxStyle = {left: '-180px'} : boxStyle = {left: '-10px'};
        return (
            <div className={classes.prueba}>
                    <div className={classes.box} style={boxStyle} onClick={(e) => this.menuSelected(e)}>
                    <p >Meat</p>
                    <p>Vegetables</p>
                    <p>Legumes</p>
                    <p>Fruits</p>
                    <p>Fish</p>
                    <p>Drinks</p>
                    <p>Frozen</p>
                    <p>Pasta</p>
                    <p>Sweets</p>
                    <p>Sauces</p>
                </div>
                <div className={classes.menuTuggle} onClick={this.toggleMenu}>
                    <img
                          src={require("../../static/imagenes-productos/burgerMenu.png")}
                          alt=''
                          width='30'
                          height='30'
                          className={classes.image}>
                    </img>
                </div>
            </div>
        )
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        selectedMenu: (target) => dispatch(actions.getMenuSelectedProducts(target))
    }
}

export default connect(null, mapDispatchToProps) (LateralMenu);