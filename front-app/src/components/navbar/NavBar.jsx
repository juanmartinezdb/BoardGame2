import React from 'react'
import "../../templates/css/NavBar.css"
import Categorie from './Categorie'
import cartImage from "../../assets/shopping-cart.png";
import { Link } from 'react-router-dom';
import { CART, PRODUCTS } from '../../utils/constants/routes';

function NavBar() {
  return (
    <nav>
      <Link to={PRODUCTS}>Products</Link>
      <Link to={CART}><img src={cartImage} alt="cart" className='cart-image' /></Link>
    </nav>
  )
}

export default NavBar