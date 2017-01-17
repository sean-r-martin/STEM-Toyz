'use strict';
import React from 'react';
import CheckoutLineItem from '../components/CheckoutLineItem';

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.state = { item: props.item };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  changeHandler (event) {
    const quantityVal = event.target.value;
    this.setState({ quantityVal })
    console.log('quantityval', quantityVal)
    console.log('quantityState', this.state.quantityVal)
  }
  submitHandler (event) {
    // event.preventDefault();
    // store.dispatch(addNewCampus(this.state));
    // this.setState({ name: '', imageURL: '', city: '', state: '' });
  }
  render () {
    return (
      <CheckoutLineItem
        changeHandler={this.changeHandler}
        {...this.state}
      />
    )
  }
}
