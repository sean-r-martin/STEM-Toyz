'use strict';

import React from 'react';
import { Link } from 'react-router';

import Login from './Login';
import WhoAmI from './WhoAmI';


export default (props) => {

  const handleChange = props.handleChange;
  const handleSubmit = props.handleSubmit;
  const showLogin = props.showLogin;
  const showCart = props.showShoppingCart;
  const toggleLogin = evt => {
    evt.preventDefault()
    props.toggleLogin(!showLogin);
  }
  const toggleCart = evt  => {
    evt.preventDefault();
    props.toggleShoppingCart(!showCart);
  }
  const user = props.user;
  const loginButton = (
    <button className="logout btn btn-primary btn-outline-success my-2 my-sm-0" onClick={toggleLogin}>Login</button>
  );
  const cartButton = (
     <button type='button' className="btn btn-default btn-primary" onClick={toggleCart}><span className="glyphicon glyphicon-shopping-cart cart-icon" type="submit"></span></button>
  );


  return (
    <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
      <h1 className="logo ">STEM Toyz</h1>
      {/*<img src="" className="logo" />*/}
      <div id="search" className="item">
        <form className="form-inline" onSubmit={handleSubmit}>
          <input className="form-control mr-sm-2" type="text" placeholder="Search" onChange={handleChange}></input>
          <button className="btn btn-primary btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
      <div id="login" className="item pull-right">
        {user ? <Link to={`/account/${user.id}`}><WhoAmI /> </Link> : loginButton}
      </div>
      <div id="cart" className="item pull-right">
        {cartButton}
      </div>
    </nav>
  );
};
/*{showCart? <ShoppingCart />: null}*/
