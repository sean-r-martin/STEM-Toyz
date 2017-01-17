import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';

import {toggleLogin} from 'APP/app/reducers/login';
import {toggleShoppingCart} from 'APP/app/reducers/toggleShoppingCart';

// Does nothing right now!!!
const searchProducts = (state) => {
  console.log(state);
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    showLogin: state.showLogin,
    showShoppingCart: state.showShoppingCart
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLogin (show) {
      dispatch(toggleLogin(show));
    },
    toggleShoppingCart(toggle) {
      dispatch(toggleShoppingCart(toggle));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(class extends Component {

  constructor (props) {
    super(props);
    this.state = {
      productQuery: '',
     };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleCart (evt) {
    let lastState = this.state.showCart;
    this.setState({ showCart: !lastState});
  }

  handleChange (value) {
    this.setState({ productQuery: value.target.value });
  }

  handleSubmit (evt) {
    evt.preventDefault();
    // a theoretical function imported to search the database
    searchProducts(this.state);
  }

  render () {
    return (
      <Navbar
        {...this.state}
        {...this.props}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
});
