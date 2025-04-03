import React from "react";
import { Link } from "react-router-dom";
import "../../templates/css/Menu.css";
import { PRODUCTS, CART } from "../../utils/routes";
import cartImage from "../../assets/images/shopping-cart.png";

export default function Menu() {
  return (
    <nav>
      <Link to={PRODUCTS}>Productos</Link>
      <Link to={CART}><img src={cartImage} alt="cart" className='cart-image' /></Link>
    </nav>
  );
}
