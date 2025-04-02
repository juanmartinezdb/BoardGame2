import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import { PRODUCTS, CART } from "../../utils/routes";

export default function Menu() {
  return (
    <nav>
      <Link to={PRODUCTS}>Productos</Link>
      <Link to={CART}>Carrito</Link>
    </nav>
  );
}
