import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

import Oferts from '../../components/Oferts/Oferts';
import Order from '../../components/TrollySummary/TrollySummary';
import Alimentos from '../../components/MarketStore/Alimentos';
import LateralMenu from '../../components/LateralMenu/LateralMenu';
import Footer from '../../components/Footer/Footer';
import StateBar from '../../components/Menubar/MenuBar';
import classes from './Shop.css';

class Shop extends Component {

  state = {
    innerWidth: null,
  }

  componentWillMount() {
    this.props.onInitProducts(); 
  }
  componentDidMount() {
    window.addEventListener('resize', this.resizeWindows);
    this.resizeWindows();
    window.scrollTo(0, 0);
  }
  resizeWindows = () => {
    this.setState({innerWidth: window.innerWidth});
  }

  render(){
    let order = (<Order/>);
    if(this.state.innerWidth < 880) order = null;
 
    return (
      <div>
          <StateBar />
          <div className={classes.ShopClass}>
              <Alimentos />
              <LateralMenu />
              <div className={classes.orderOferts}>
                <Oferts />
                {order}
              </div>    
          </div>
          <Footer />
      </div>
    )

  }
}
const mapDispatchToProps = dispatch => {
    return {
        onInitProducts: () => dispatch(actions.getProducts())
    }
}

export default connect(null, mapDispatchToProps) (Shop);

