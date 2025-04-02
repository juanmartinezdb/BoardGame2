import React from "react";
import "./Header.css";
import { Link } from 'react-router-dom';
import { PRODUCTS } from "../../utils/routes";
import logo from "../../assets/images/Tabletopia.png"


export default function Header() {
  return (
    <header>
        <Link to={PRODUCTS}><img src={logo} alt="logo" className="logo" /></Link>
    </header>
  );
}